using DoItTest.Tools.Types;
using System.Collections.Concurrent;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DoItTest.Tools.Json.Converters
{
    public class DomainConverter<T> : JsonConverter<T>
    {
        private static readonly ConcurrentDictionary<Type, List<JsonMemberInfo>> _jsonMembers = new();

        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            if (value is null)
            {
                writer.WriteNullValue();
                return;
            }

            Type type = value.GetType();

            List<JsonMemberInfo> memberInfos = _jsonMembers.GetOrAdd(type, valueType => GetJsonMemberInfos(valueType, options));


            writer.WriteStartObject();

            foreach (JsonMemberInfo memberInfo in memberInfos)
            {

                Object? propertyValue = memberInfo.GetValue(value);

                writer.WritePropertyName(memberInfo.Name);
                JsonSerializer.Serialize(writer, propertyValue, options);
            }

            writer.WriteEndObject();
        }


        private static List<JsonMemberInfo> GetJsonMemberInfos(Type type, JsonSerializerOptions options)
        {
            PropertyInfo[] properties = type.GetProperties().Where(p => p.GetCustomAttribute<JsonIgnoreAttribute>() == null && p.CanRead).ToArray();
            FieldInfo[] fields = type.GetFields(BindingFlags.NonPublic | BindingFlags.Instance).Where(x => x.GetCustomAttribute<JsonPropertyNameAttribute>() != null).ToArray();


            List<JsonMemberInfo> members = new();

            foreach (PropertyInfo property in properties)
            {
                JsonPropertyNameAttribute? propertyNameAttribute = property.GetCustomAttribute<JsonPropertyNameAttribute>();

                String name = propertyNameAttribute is null ? property.Name : propertyNameAttribute.Name;

                members.Add(new JsonMemberInfo(property, options.PropertyNamingPolicy?.ConvertName(name) ?? name));
            }

            foreach (FieldInfo fieldInfo in fields)
            {
                JsonPropertyNameAttribute? propertyNameAttribute = fieldInfo.GetCustomAttribute<JsonPropertyNameAttribute>();

                String name = propertyNameAttribute is null ? fieldInfo.Name : propertyNameAttribute.Name;

                members.Add(new JsonMemberInfo(fieldInfo, options.PropertyNamingPolicy?.ConvertName(name) ?? name));
            }


            return members;
        }
    }
}