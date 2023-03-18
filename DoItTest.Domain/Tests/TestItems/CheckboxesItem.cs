using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class CheckboxesItem : TestItem
    {
        public CheckboxesAnswerOption[] AnswerOptions { get; }

        public CheckboxesItem(Guid id, Guid testId, TestItemType type,
            String question, String? imageBase64, CheckboxesAnswerOption[] answerOptions) 
            : base(id, testId, type, question, imageBase64)
        {
            AnswerOptions = answerOptions;
        }
    }

}

