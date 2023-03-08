namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class AnswerOptionBlank
    {
        public Guid? Id { get; set; }
        public Guid? TestItemId { get; set; }
        public TestItemType Type { get; set; }
        public String? StringAnswer { get; set; }
        public Decimal? NumberAnswer { get; set; }
        public String? Title { get; set; }
        public Boolean? IsTrue { get; set; }
        public Guid? GroupId { get; set; }
        public String? GroupName { get; set; }
    }
}
