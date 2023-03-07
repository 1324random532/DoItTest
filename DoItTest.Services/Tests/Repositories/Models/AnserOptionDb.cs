namespace DoItTest.Services.Tests.Repositories.Models
{
    public class AnserOptionDb
    {
		public Guid Id { get; set; }
		public Guid TestItemId { get; set; }
		public String? StringAnswer { get; set; }
		public Decimal? NumberAnswer { get; set; }
		public String? Title { get; set; }
		public Boolean? IsTrue { get; set; }

		public Boolean IsRemoved { get; set; }
	}
}
