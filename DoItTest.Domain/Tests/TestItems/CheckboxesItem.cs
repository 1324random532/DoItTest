using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class CheckboxesItem : TestItem
    {
        public CheckboxesAnswerOption[] AnswerOptions { get; }

        public CheckboxesItem(Guid id, Guid testId, TestItemType type,
            String question, CheckboxesAnswerOption[] answerOptions) 
            : base(id, testId, type, question)
        {
            AnswerOptions = answerOptions;
        }
    }

}

