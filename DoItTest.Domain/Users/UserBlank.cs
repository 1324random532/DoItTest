using System.Text.Json.Serialization;

namespace DoItTest.Domain.Users
{
    public class UserBlank
    {
        public Guid? Id { get; set; }
        public String? Login { get; set; }
        public String? Password { get; set; }
        public UserRole? Role { get; set; }

        [JsonIgnore]
        public String PasswordHash => User.DefinePasswordHash(Password!);
    }
}
