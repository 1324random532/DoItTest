using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Bases;
using DoItTest.Site.Infrastructure.Filters;
using DoItTest.Tools.Managers;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DoItTest.Site.Areas.Registration
{
    public class RegistrationController : BaseController
    {
        private readonly IUsersService _usersService;

        public RegistrationController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost("/Registration")]
        [AllowAnonymous]
        public Result Registration([FromBody] RegistrationData registrationData)
        {
            DataResult<UserToken> tokenResult = _usersService.Registration(registrationData);
            if (!tokenResult.IsSuccess) return Result.Fail(tokenResult.Errors);

            Cookie cookie = new Cookie(IsAuthorizedAttribute.CookieName, tokenResult.Data!.Value);
            CookieManager.Write(Response, cookie, DateTime.MaxValue);

            return Result.Success();
        }
    }
}
