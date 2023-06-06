using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Services.Users.Repositories;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Services.Users
{
    public class UsersService: IUsersService
	{
        private readonly UsersRepository _usersRepository;

        public UsersService(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
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

			if (userBlank.Role is null)
				return Result.Fail("Не указана роль");

			if (userBlank.Id is null)
			{
				if (String.IsNullOrWhiteSpace(userBlank.Password))
					return Result.Fail("Не указан пароль");

				if (userBlank.Password.Length > 40)
					return Result.Fail("Пароль превышает 40 символов");

				userBlank.Id = Guid.NewGuid();

				_usersRepository.AddUser(userBlank, userId);

				return Result.Success();
			}

			if(userBlank.Password is not null && userBlank.Password.Length > 40) 
				return Result.Fail("Пароль превышает 40 символов");

			User? user = GetUser(userBlank.Id.Value);
			if (user is null) return Result.Fail("Пользователь не найден");

			_usersRepository.DeleteUserToken(user.Id);

			_usersRepository.UpdateUser(userBlank, userId);
			return Result.Success();
		}

		public User? GetUser(Guid id)
		{
			return _usersRepository.GetUser(id);
		}

		public PagedResult<User> GetPagedUsers(Int32 page, Int32 count)
		{
			return _usersRepository.GetPagedUsers(page, count);
		}

		public Result RemoveUser(Guid id)
		{
			User? removingUser = GetUser(id);
			if (removingUser is null)
				return Result.Fail("User не найден");

			_usersRepository.RemoveUser(id);

			return Result.Success();
		}

		public UserToken? GetUserToken(String? token)
		{
			return _usersRepository.GetUserToken(token);
		}

		public DataResult<UserToken> Registration(RegistrationData registrationData)
		{
			UserBlank userBlank = new UserBlank
			{
				Login = registrationData.Login,
				Password = registrationData.Password,
				Role = UserRole.TestCreator
			};

			Result userResult = SaveUser(userBlank, null);
			if (!userResult.IsSuccess) return DataResult<UserToken>.Failed(userResult.Errors);

			UserToken token = UserToken.New(userBlank.Id!.Value);

			_usersRepository.SaveUserToken(token);

			return DataResult<UserToken>.Success(token);
		}

		#region auth

		public DataResult<UserToken> LogIn(AuthorizationData authorizationData)
		{
			if (String.IsNullOrWhiteSpace(authorizationData.Login) || String.IsNullOrWhiteSpace(authorizationData.Password))
				return DataResult<UserToken>.Failed("Не указан логин или пароль");

			String? passwordHash = User.DefinePasswordHash(authorizationData.Password);
			User? user = _usersRepository.GetUser(authorizationData.Login, passwordHash);
			if (user is null) return DataResult<UserToken>.Failed("Неправильно указан логин или пароль");

			UserToken token = UserToken.New(user.Id);

			_usersRepository.SaveUserToken(token);

			return DataResult<UserToken>.Success(token);
		}

		public Result LogOut(String? userTokenId)
		{
			if (userTokenId is null) return Result.Success();

			UserToken? userToken = _usersRepository.GetUserToken(userTokenId);
			if (userToken is null) return Result.Success();

			_usersRepository.DeleteUserToken(userToken.Value);
			return Result.Success();
		}

		#endregion
	}
}
