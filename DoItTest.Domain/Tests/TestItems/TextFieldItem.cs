using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class TextFieldItem : TestItem
    {
        public TextFildAnserOption AnswerOption { get; }

        public TextFieldItem(Guid id, Guid testId, TestItemType type,
            String question, TextFildAnserOption answerOption) 
            : base(id, testId, type, question)
        {
            AnswerOption = answerOption;
        }
    }
}
