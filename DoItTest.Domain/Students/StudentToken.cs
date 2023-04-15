namespace DoItTest.Domain.Students
{
    public class StudentToken
    {
        private const int TTL = 86_400;

        public String Value { get; }
        public DateTime ExpirationDateTimeUtc { get; }
        public Guid StudentId { get; }
        public Boolean IsExpired => DateTime.UtcNow >= ExpirationDateTimeUtc;


        public StudentToken(String value, DateTime expirationDateTimeUtc, Guid studentId)
        {
            Value = value;
            ExpirationDateTimeUtc = expirationDateTimeUtc;
            StudentId = studentId;
        }

        public static StudentToken New(Guid studentId)
        {
            DateTime expirationDateTimeUtc = DateTime.UtcNow.AddSeconds(TTL);
            String tokenValue = Guid.NewGuid().ToString();
            return new StudentToken(tokenValue, expirationDateTimeUtc, studentId);
        }
    }
}
