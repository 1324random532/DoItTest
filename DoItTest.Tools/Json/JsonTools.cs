using DoItTest.Tools.Json.Converters;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DoItTest.Tools.Json;

public static class JsonTools
{
    public static JsonSerializerOptions Options = new();

    private static readonly JsonConverter[] Converters =
    {
        new DateOnlyJsonConverter()
    };

    public static JsonSerializerOptions AddJsonSettings(this JsonSerializerOptions options)
    {
        options.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
        options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

        Options = options;
        return options;
    }

    public static JsonSerializerOptions ApplyToolsConverters(this JsonSerializerOptions options)
    {
        foreach (JsonConverter converter in Converters)
            options.Converters.Add(converter);

        Options = options;
        return options;
    }

    public static JsonSerializerOptions ApplyAnyTypeConverters(this JsonSerializerOptions options, Assembly forAssembly)
    {
        options.Converters.Add(new AnyTypeJsonConverterFactory(forAssembly));

        Options = options;
        return options;
    }

    public static string Serialize(this object @object) => JsonSerializer.Serialize(@object, Options);
    public static T? Deserialize<T>(this string @string) => JsonSerializer.Deserialize<T>(@string, Options);

    public static object? Deserialize(this string? str, Type type)
    {
        if (str is null) return default;
        return JsonSerializer.Deserialize(str, type, Options);
    }
}