using System.Text.Json;
using System.Text.Json.Serialization;

namespace DoItTest.Tools.Json.Converters
{
    public class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        private readonly string serializationFormat = "yyyy-MM-dd";

        public override DateOnly Read(ref Utf8JsonReader reader,
                                Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            value = value!.Split('T')[0];
            return DateOnly.Parse(value);
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value,
                                            JsonSerializerOptions options)
            => writer.WriteStringValue(value.ToString(serializationFormat));
    }
}
