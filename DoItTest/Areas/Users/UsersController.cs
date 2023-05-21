using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Bases;
using DoItTest.Site.Infrastructure.Filters;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Users
{
    public class UsersController : BaseController
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [IsAuthorized(true)]
        [HttpGet("Users")]
        [HttpGet("Users/New")]
        [HttpGet("Users/Edit/{userId}")]
        public IActionResult App()
        {
            return ReactApp();
        }

        [IsAuthorized(true)]
        [HttpPost("Users/Save")]
        public Result SaveUser([FromBody] UserBlank userBlank)
        {
            return _usersService.SaveUser(userBlank, SystemUser.Id);
        }

        [IsAuthorized(true)]
        [HttpGet("Users/GetById")]
        public User? GetUser(Guid id)
        {
            return _usersService.GetUser(id);
        }

        [IsAuthorized(true)]
        [HttpGet("Users/GetPaged")]
        public PagedResult<User> GetPagedUsers(Int32 page, Int32 count)
        {
            return _usersService.GetPagedUsers(page, count);
        }

        [IsAuthorized(true)]
        [HttpPost("Users/Remove")]
        public Result RemoveUser([FromBody] Guid id)
        {
            return _usersService.RemoveUser(id);
        }
    }
}
