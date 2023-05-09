using DoItTest.Domain.Tests.TestItems;

namespace DoItTest.Services.Answers.Repositories.Models
{
    public class AnswerDb
    {
        public Guid Id { get; set; }
        public Guid StudentTestId { get; set; }
        public Guid TestItemId { get; set; } 
        public String? StringAnswer { get; set; }
        public Decimal? NumberAnswer { get; set; }
        public Guid? AnswerOptionId { get; set; }
        public Guid[] AnswerOptionIds { get; set; }
        public Boolean IsActive { get; set; }

        public DateTime CreatedDateTimeUtc { get; set; }
        public Guid? ModifiedUserId { get; set; }
        public DateTime? ModifiedDateTimeUtc { get; set; }
        public Boolean IsRemoved { get; set; }
    }
}
