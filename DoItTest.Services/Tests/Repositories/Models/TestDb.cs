namespace DoItTest.Services.Tests.Repositories.Models
{
    public class TestDb
    {
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public String Title { get; set; } = null!;

		public Boolean IsRemoved { get; set; }
		public Int32 FullCount { get; set; }
	}
}
