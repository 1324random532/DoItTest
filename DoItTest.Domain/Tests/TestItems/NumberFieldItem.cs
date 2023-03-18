using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{

    public class NumberFieldItem : TestItem
    {
        public NumberAnswerOption AnswerOption { get; }

        public NumberFieldItem(Guid id, Guid testId, TestItemType type,
            String question, String? imageBase64, NumberAnswerOption answerOption) 
            : base(id, testId, type, question, imageBase64)
        {
            AnswerOption = answerOption;
        }
    }
}
