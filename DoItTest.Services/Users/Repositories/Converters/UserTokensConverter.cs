using DoItTest.Domain.Users;
using DoItTest.Services.Users.Repositories.Models;

namespace DoItTest.Services.Users.Repositories.Converters
{
    internal static class UserTokensConverter
    {
        public static UserToken ToUserToken(this UserTokenDb userToken)
        {
            return new UserToken(userToken.Token, userToken.ExpirationDateTimeUtc, userToken.UserId);
        }
    }
}
