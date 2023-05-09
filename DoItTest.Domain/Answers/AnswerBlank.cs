using DoItTest.Domain.Tests.TestItems;

namespace DoItTest.Domain.Answers
{
    public class AnswerBlank
    {
        public Guid StudentId { get; set; }
        public Guid TestId { get; set; }
        public String? StringAnswer { get; set; }
        public Decimal? NumberAnswer { get; set; }
        public Guid? AnswerOptionId { get; set; }
        public Guid[] AnswerOptionIds { get; set; }
    }
}
