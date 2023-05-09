using DoItTest.Domain.Tests;

namespace DoItTest.Services.Tests.Repositories.Models
{
    public class StudentTestDb
    {
		public Guid Id { get; set; }
		public Guid TestId { get; set; }
		public Guid StudentId { get; set; }
		public DateTime BeginDateTime { get; set; }
		public DateTime? EndDateTime { get; set; }
		public Int32 PercentageOfCorrectAnswers { get; }
		public Int32 Estimation { get; }
		public Boolean IsExpired { get; set; }

		public Guid? ModifiedUserId { get; set; }
		public DateTime? ModifiedDateTime { get; set; }
		public Boolean IsRemoved { get; set; }
		public Int32 FullCount { get; set; }
	}
}