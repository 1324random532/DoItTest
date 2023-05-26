namespace DoItTest.Domain.Tests
{
    public class TestInfo
    {
        public Guid TestId { get; }
        public String Title { get; }
        public Int32 TimeToCompleteInSeconds { get; }
        public Int32 TestItemCount { get; }
        
        public TestInfo(Guid testId, String title, Int32 timeToCompleteInSeconds, Int32 testItemCount)
        {
            TestId = testId;
            Title = title;
            TimeToCompleteInSeconds = timeToCompleteInSeconds;
            TestItemCount = testItemCount;
        }
    }
}
