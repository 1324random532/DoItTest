namespace DoItTest.Domain.Tests
{
    public class Test
    {
        public Guid Id { get; }
        public Guid UserId { get; }
        public String Title { get; }
        public Int32 TimeToCompleteInSeconds { get; }
        public Int32 NumberOfPercentagesByFive { get; }
        public Int32 NumberOfPercentagesByFour { get; }
        public Int32 NumberOfPercentagesByThree { get; }

        public Test(Guid id, Guid userId, String title, Int32 timeToCompleteInSeconds, Int32 numberOfPercentagesByFive, Int32 numberOfPercentagesByFour, Int32 numberOfPercentagesByThree)
        {
            Id = id;
            UserId = userId;
            Title = title;
            TimeToCompleteInSeconds = timeToCompleteInSeconds;
            NumberOfPercentagesByFive = numberOfPercentagesByFive;
            NumberOfPercentagesByFour = numberOfPercentagesByFour;
            NumberOfPercentagesByThree = numberOfPercentagesByThree;
        }
    }
}
