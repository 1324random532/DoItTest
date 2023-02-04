using DoItTest.Tools.Json.Attributes;
using System.Collections.Concurrent;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DoItTest.Tools.Json.Converters;

public class AnyTypeJsonConverterFactory : JsonConverterFactory
{
    private readonly Type[] _availableTypes;

    private static readonly ConcurrentDictionary<Type, JsonConverter?> Converters = new();

    public AnyTypeJsonConverterFactory(Assembly assembly)
    {
        string assemblyName = assembly.FullName!.Split(",")[0];
        _availableTypes = assembly.GetTypes().Where(t => !t.IsEnum &&
                                                        !t.IsInterface &&
                                                        t.GetCustomAttribute<CompilerGeneratedAttribute>() is null &&
                                                        t.FullName!.Contains(assemblyName)).ToArray();
    }

    public override bool CanConvert(Type typeForConvert)
    {
        if (!_availableTypes.Contains(typeForConvert)) return false;

        if (Converters.TryGetValue(typeForConvert, out JsonConverter? converter))
            return converter is not null;

        Type converterType = typeof(AnyTypeJsonConverter<>).MakeGenericType(typeForConvert);

        converter = Activator.CreateInstance(converterType) as JsonConverter;
        if (converter is null) return false;

        return Converters.TryAdd(typeForConvert, converter);
    }

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
    {
        return Converters[typeToConvert]!;
    }
}

public class AnyTypeJsonConverter<T> : JsonConverter<T>
{
    private static readonly ConcurrentDictionary<Type, JsonMember[]> JsonMembers = new();

    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
            throw new JsonException();

        using JsonDocument jsonDocument = JsonDocument.ParseValue(ref reader);

        string jsonObject = jsonDocument.RootElement.GetRawText();

        // Игнорируем текущий конвертер, чтобы не уходило в рекурсию
        JsonSerializerOptions optionsWithoutAnyTypeConverter = new(options);
        int index = optionsWithoutAnyTypeConverter.Converters.ToList().FindIndex(c => c is AnyTypeJsonConverterFactory);
        optionsWithoutAnyTypeConverter.Converters.RemoveAt(index);

        return JsonSerializer.Deserialize<T>(jsonObject, optionsWithoutAnyTypeConverter)!;
    }

    public override void Write(Utf8JsonWriter writer, T? value, JsonSerializerOptions options)
    {
        if (value is null)
        {
            writer.WriteNullValue();
            return;
        }

        JsonMember[] members = JsonMembers.GetOrAdd(value.GetType(), JsonMember.Get).ToArray();

        writer.WriteStartObject();

        foreach (JsonMember member in members.Where(m => m.ShouldSerialize(value)))
        {
            object? memberValue = member.GetValue(value);

            string memberName = options.PropertyNamingPolicy?.ConvertName(member.Name) ?? member.Name;

            writer.WritePropertyName(memberName);
            JsonSerializer.Serialize(writer, memberValue, options);
        }

        writer.WriteEndObject();
    }

    internal abstract record JsonMember(MemberInfo MemberInfo)
    {
        internal record Property(PropertyInfo PropertyInfo, string? ShouldSerializeMember) : JsonMember(PropertyInfo);

        internal record Method(MethodInfo MethodInfo) : JsonMember(MethodInfo);

        public string Name => MemberInfo.Name;

        public bool ShouldSerialize(object obj)
        {
            return this switch
            {
                Property property => property.ShouldSerializeMember is null || (GetValue(obj, property.ShouldSerializeMember) is bool shouldSerialize
                    ? shouldSerialize
                    : throw new Exception("Значение атрибута ShouldSerialize не имеет тип Boolean")),
                Method => false,
                _ => throw new Exception("Некорректный тип члена класса")
            };
        }

        public object? GetValue(object obj) => MemberInfo switch
        {
            PropertyInfo propertyInfo => propertyInfo.GetValue(obj),
            MethodInfo methodInfo => methodInfo.Invoke(obj, null),
            _ => throw new Exception("Некорректный тип члена класса")
        };

        public object? GetValue(object? src, string propertyName)
        {
            if (src is null) throw new ArgumentException("Value cannot be null.", "src");
            if (propertyName is null) throw new ArgumentException("Value cannot be null.", "propertyName");

            JsonMember? property = JsonMembers.GetOrAdd(src.GetType(), Get).FirstOrDefault(member => member.Name == propertyName);
            return property?.GetValue(src);
        }

        public static JsonMember[] Get(Type type)
        {
            List<JsonMember> members = new();

            PropertyInfo[] properties = type.GetProperties(BindingFlags.Instance | BindingFlags.Public).Where(p => p.CanRead && p.GetCustomAttribute<JsonIgnoreAttribute>() is null).ToArray();
            foreach (PropertyInfo property in properties)
            {
                ShouldSerializeAttribute? shouldSerializeAttribute = property.GetCustomAttribute<ShouldSerializeAttribute>();
                members.Add(new Property(property, shouldSerializeAttribute?.ShouldSerializeMethodName));
            }

            foreach (MethodInfo method in type.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic))
            {
                members.Add(new Method(method));
            }

            return members.ToArray();
        }
    }
}