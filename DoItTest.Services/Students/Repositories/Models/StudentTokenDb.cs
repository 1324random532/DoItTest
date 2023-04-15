namespace DoItTest.Services.Students.Models
{
    internal class StudentTokenDb
    {
        public String Token { get; set; } = null!;
        public Guid ClientId { get; set; }
        public DateTime ExpirationDateTimeUtc { get; set; }
    }
}
