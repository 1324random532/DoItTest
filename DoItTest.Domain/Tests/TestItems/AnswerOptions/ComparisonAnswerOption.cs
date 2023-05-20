namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class ComparisonAnswerOption : AnswerOption
    {
        public Guid? GroupId { get; private set; }
        public String? GroupName { get; private set; }
        public String Title { get;  }

        public ComparisonAnswerOption(Guid id, Guid testItemId, TestItemType type, Guid? groupId, String? groupName, String title) : base(id, testItemId, type)
        {
            GroupId = groupId;
            GroupName = groupName;
            Title = title;
        }

        public void ClearGroup()
        {
            GroupId = null;
            GroupName = null;
        }
    }
}
