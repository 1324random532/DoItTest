using DoItTest.Domain.Users;

namespace DoItTest.Services.Users.Repositories.Models
{
    public class UserDb
	{
		public Guid Id { get; set; }
		public String Login { get; set; } = null!;
		public String PasswordHash { get; set; } = null!;
		public UserRole Role { get; set; }

		public DateTime CreatedDateTime { get; set; }
		public Guid? ModifiedUserId { get; set; }
		public DateTime? ModifiedDateTime { get; set; }
		public Boolean IsRemoved { get; set; }
	}
}
