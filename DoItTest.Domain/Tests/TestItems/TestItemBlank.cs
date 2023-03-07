using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class TestItemBlank
    {
        public Guid? Id { get; set; }
        public Guid? TestId { get; set; }
        public TestItemType? Type { get; set; }
        public String? Question { get; set; }
        public AnswerOpttionBlank[] AnswerOptions { get; set; }
        public AnswerOpttionBlank? AnswerOption { get; set; }
    }
}
