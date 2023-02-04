using DoItTest.Domain.Users;
using DoItTest.Services.Users.Repositories.Models;

namespace DoItTest.Services.Users.Repositories.Converters
{
    internal static class UsersConverter
	{
		public static User[] ToUsers(this IEnumerable<UserDb> dbs)
		{
			return dbs.Select(ToUser).ToArray();
		}

		public static User ToUser(this UserDb db)
		{
			return new User(db.Id, db.Login, db.Role);
		}
	}
}
