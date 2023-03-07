using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class RadioButtonItem : TestItem
    {
        public RadioButtonAnserOption[] AnswerOptions { get; }

        public RadioButtonItem(Guid id, Guid testId, TestItemType type,
            String question, RadioButtonAnserOption[] answerOptions) 
            : base(id, testId, type, question)
        {
            AnswerOptions = answerOptions;
        }
    }

}

