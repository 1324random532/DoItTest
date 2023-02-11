using DoItTest.Domain.Users;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Domain.Services
{
    public interface IUsersService
    {
        Result SaveUser(UserBlank userBlank, Guid? userId);
        User? GetUser(Guid id);
        Result RemoveUser(Guid id);

        DataResult<UserToken> Registration(RegistrationData registrationData);

        DataResult<UserToken> LogIn(AuthorizationData authorizationData);
        UserToken? GetUserToken(String? token);
        Result LogOut(String? token);
    }
}
