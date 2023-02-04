using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Services.Users.Repositories;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Services.Users
{
    public class UsersService: IUsersService
	{
        private readonly UsersRepository _usersRepository;

        public UsersService(String connectionString)
        {
            _usersRepository = new UsersRepository(connectionString);
        }

		public Result SaveUser(UserBlank userBlank, Guid? userId)
		{
			if (String.IsNullOrWhiteSpace(userBlank.Login))
				return Result.Fail("Не указан логин");

			User? userWithSameLogin = _usersRepository.GetUser(userBlank.Login);

			if (userWithSameLogin is not null && userBlank.Id != userWithSameLogin.Id)
				return Result.Fail("Пользователь с таким логином существует");

			if (userBlank.Login.Length > 40)
				return Result.Fail("Логин превышает 40 символов");

			if (String.IsNullOrEmpty(userBlank.Password))
				return Result.Fail("Не указан пароль");

			if (userBlank.Password.Length > 40)
				return Result.Fail("Пароль превышает 40 символов");

			if (userBlank.Role is null)
				return Result.Fail("Не указана роль");

			if (userBlank.Id is null) userBlank.Id = Guid.NewGuid();
			_usersRepository.SaveUser(userBlank, userId);
			return Result.Success();
		}

		public User? GetUser(Guid id)
		{
			return _usersRepository.GetUser(id);
		}

		public Result RemoveUser(Guid id)
		{
			User? removingUser = GetUser(id);
			if (removingUser is null)
				return Result.Fail("User не найден");

			_usersRepository.RemoveUser(id);

			return Result.Success();
		}
	}
}
