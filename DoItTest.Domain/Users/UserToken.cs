namespace DoItTest.Domain.Users
{
    public class UserToken
    {
        private const int TTL = 86_400;

        public String Value { get; }
        public DateTime ExpirationDateTimeUtc { get; }
        public Guid UserId { get; }
        public Boolean IsExpired => DateTime.UtcNow >= ExpirationDateTimeUtc;


        public UserToken(string value, DateTime expirationDateTimeUtc, Guid userId)
        {
            Value = value;
            ExpirationDateTimeUtc = expirationDateTimeUtc;
            UserId = userId;
        }

        public static UserToken New(Guid userId)
        {
            DateTime expirationDateTimeUtc = DateTime.UtcNow.AddSeconds(TTL);
            String tokenValue = Guid.NewGuid().ToString();
            return new UserToken(tokenValue, expirationDateTimeUtc, userId);
        }
    }
}
