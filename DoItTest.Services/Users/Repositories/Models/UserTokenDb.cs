namespace DoItTest.Services.Users.Repositories.Models
{
    internal class UserTokenDb
    {
        public string Token { get; set; } = null!;
        public Guid UserId { get; set; }
        public DateTime ExpirationDateTimeUtc { get; set; }
    }
}
