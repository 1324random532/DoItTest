namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class AnswerOptionGroup: AnswerOption
    {
        public Guid Id { get; }
        public String Name { get; }
        public AnswerOption[] AnswerOptions { get; }

        public AnswerOptionGroup(Guid id, Guid testItemId, TestItemType type, String name, AnswerOption[] answerOptions) : base(id, testItemId, type)
        {
            Id = id;
            Name = name;
            AnswerOptions = answerOptions;
        }
    }
}
