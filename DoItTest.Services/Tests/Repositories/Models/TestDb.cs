namespace DoItTest.Services.Tests.Repositories.Models
{
    public class TestDb
    {
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public String Title { get; set; } = null!;
		public Int32 TimeToCompleteInSeconds { get; set; }
		public Int32 NumberOfPercentagesByFive { get; set; }
		public Int32 NumberOfPercentagesByFour { get; set; }
		public Int32 NumberOfPercentagesByThree { get; set; }
		public Boolean BlockPassage { get; set; }

		public Boolean IsRemoved { get; set; }
		public Int32 FullCount { get; set; }
	}
}
