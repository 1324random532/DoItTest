namespace DoItTest.Domain.Tests
{
    public class StudentTestInfo
    {
        public DateTime BeginDateTime { get; }
        public Int32 PassedTestItemtCount { get; }

        public StudentTestInfo(DateTime beginDateTime, Int32 passedTestItemtCount)
        {
            BeginDateTime = beginDateTime;
            PassedTestItemtCount = passedTestItemtCount;
        }
    }
}

