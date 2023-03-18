using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class TestItemBlank
    {
        public Guid? Id { get; set; }
        public Guid? TestId { get; set; }
        public TestItemType? Type { get; set; }
        public String? Question { get; set; }
        public String? ImageBase64 { get; set; }
        public AnswerOptionBlank[] AnswerOptions { get; set; }
        public AnswerOptionBlank? AnswerOption { get; set; }
        public AnswerOptionGroupBlank[] AnswerOptionGroups { get; set; }
    }
}
