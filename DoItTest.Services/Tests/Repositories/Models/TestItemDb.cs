using DoItTest.Domain.Tests.TestItems;

namespace DoItTest.Services.Tests.Repositories.Models
{
    public class TestItemDb
	{
		public Guid Id { get; set; }
		public Guid TestId { get; set; }
		public TestItemType Type { get; set; }
		public String Question { get; set; }

		public Boolean IsRemoved { get; set; }
	}
}
