using DoItTest.Tools.Json.Converters;
using System.Text.Json.Serialization;

namespace DoItTest.Domain.Tests.TestItems
{
    [JsonConverter(typeof(DomainConverter<TestItem>))]
    public abstract class TestItem
    {
        public Guid Id { get; }
        public Guid TestId { get; }
        public TestItemType Type { get; }
        public String Question { get; }
        public String? ImageBase64 { get; }

        public TestItem(Guid id, Guid testId, TestItemType type, String question, String? imageBase64)
        {
            Id = id;
            TestId = testId;
            Type = type;
            Question = question;
            ImageBase64 = imageBase64;
        }
    }
}
