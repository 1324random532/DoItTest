namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class TextFildAnswerOption : AnswerOption
    {
        public String? Answer { get; }

        public TextFildAnswerOption(Guid id, Guid testItemId, TestItemType type, String? answer) : base(id, testItemId, type)
        {
            Answer = answer;
        }
    }
}
