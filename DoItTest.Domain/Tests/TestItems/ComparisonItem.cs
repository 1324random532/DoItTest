using DoItTest.Domain.Tests.TestItems.AnswerOptions;

namespace DoItTest.Domain.Tests.TestItems
{
    public class ComparisonItem : TestItem
    {
        public AnswerOptionGroup[] AnswerOptionGroups { get; }
        public ComparisonAnswerOption[] AnswerOptions { get; }

        public ComparisonItem(Guid id, Guid testId, TestItemType type,
            String question, String? imageBase64, AnswerOptionGroup[] answerOptionGroups, ComparisonAnswerOption[] answerOptions)
            : base(id, testId, type, question,imageBase64)
        {
            AnswerOptionGroups = answerOptionGroups;
            AnswerOptions = answerOptions;
        }
    }
}
