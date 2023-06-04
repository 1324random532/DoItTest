using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using DoItTest.Site.Areas.Bases;
using DoItTest.Domain.Services;
using DoItTest.Tools.Types.Results;
using DoItTest.Domain.Users;
using DoItTest.Site.Infrastructure.Filters;
using DoItTest.Tools.Managers;

namespace DoItTest.Site.Areas.Authorizations
{
    public class AuthController : BaseController
    {
        private readonly IUsersService _usersService;

        public AuthController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("/Auth")]
        [AllowAnonymous]
        public IActionResult App()
        {
            return ReactApp();
        }

        [HttpPost("/Authorize")]
        [AllowAnonymous]
        public Result Authorize([FromBody] AuthorizationData authorizationData)
        {
            string? oldToken = (string?)CookieManager.Read(Request, IsAuthorizedAttribute.CookieName);
            if (oldToken != null)
            {
                CookieManager.Delete(Response, IsAuthorizedAttribute.CookieName);
                _usersService.LogOut(oldToken);
            }

            DataResult<UserToken> tokenResult = _usersService.LogIn(authorizationData);
            if (!tokenResult.IsSuccess) return Result.Fail(tokenResult.Errors);

            Cookie cookie = new Cookie(IsAuthorizedAttribute.CookieName, tokenResult.Data!.Value);
            CookieManager.Write(Response, cookie, DateTime.MaxValue);

            return Result.Success();
        }

        [HttpPost("/LogOut")]
        public Result LogOut()
        {
            string? userToken = (string?)CookieManager.Read(Request, IsAuthorizedAttribute.CookieName);

            if (userToken is null)
            {
                return Result.Success();
            }

            CookieManager.Delete(Response, IsAuthorizedAttribute.CookieName);
            return _usersService.LogOut(userToken);
        }
    }
}
