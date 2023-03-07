namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class TextFildAnserOption : AnswerOption
    {
        public String Answer { get; }

        public TextFildAnserOption(Guid id, Guid testItemId, String answer) : base(id, testItemId)
        {
            Answer = answer;
        }
    }
}
