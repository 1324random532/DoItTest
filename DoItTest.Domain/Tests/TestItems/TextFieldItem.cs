using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class TextFieldItem : TestItem
    {
        public TextFildAnswerOption AnswerOption { get; }

        public TextFieldItem(Guid id, Guid testId, TestItemType type,
            String question, String? imageBase64, TextFildAnswerOption answerOption) 
            : base(id, testId, type, question, imageBase64)
        {
            AnswerOption = answerOption;
        }
    }
}
