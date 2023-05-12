namespace DoItTest.Domain.Tests
{
    public class StudentTestFilter
    {
        public Int32 Page { get; set; }
        public Int32 PageSize { get; set; }
        public String? Group { get; set; }
        public String? studentFIO { get; set; }
        public Guid? TestId { get; set; }
        public Guid? UserId { get; set; }
    }
}
