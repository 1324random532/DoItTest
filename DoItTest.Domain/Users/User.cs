using System.Security.Cryptography;
using System.Text;

namespace DoItTest.Domain.Users
{
    public class User
    {
        public Guid Id { get; }
        public String Login { get; }
        public UserRole Role { get; }

        public User(Guid id, String login, UserRole role)
        {
            Id = id;
            Login = login;
            Role = role;
        }

        public static String? DefinePasswordHash(String password)
        {
            if (String.IsNullOrWhiteSpace(password)) return null;

            Byte[] bytes = Encoding.Unicode.GetBytes(password);

            using MD5 md5 = MD5.Create();
            Byte[] byteHash = md5.ComputeHash(bytes);

            String hash = String.Empty;

            foreach (Byte b in byteHash)
                hash += $"{b:x2}";

            return hash;
        }
    }
}
