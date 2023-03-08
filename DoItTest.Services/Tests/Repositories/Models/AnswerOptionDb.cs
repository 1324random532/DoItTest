using DoItTest.Domain.Tests.TestItems;

namespace DoItTest.Services.Tests.Repositories.Models
{
	public class AnswerOptionDb
	{
		public Guid Id { get; set; }
		public Guid TestItemId { get; set; }
		public TestItemType Type { get; set; }
		public String? StringAnswer { get; set; }
		public Decimal? NumberAnswer { get; set; }
		public String? Title { get; set; }
		public Boolean? IsTrue { get; set; }
		public Guid? GroupId { get; set; }
		public String? GroupName { get; set; }

		public Boolean IsRemoved { get; set; }
	}
}
