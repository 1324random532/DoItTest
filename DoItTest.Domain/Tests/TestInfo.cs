namespace DoItTest.Domain.Tests
{
    public class TestInfo
    {
        public Guid TestId { get; }
        public String Title { get; }
        public Int32 TimeToCompleteInSeconds { get; }
        
        public TestInfo(Guid testId, String title, Int32 timeToCompleteInSeconds)
        {
            TestId = testId;
            Title = title;
            TimeToCompleteInSeconds = timeToCompleteInSeconds;
        }
    }
}
