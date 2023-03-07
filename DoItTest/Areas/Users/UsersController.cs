using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Bases;
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

        [HttpGet("Users")]
        [HttpGet("Users/New")]
        [HttpGet("Users/Edit/{userId}")]
        public IActionResult App()
        {
            return ReactApp();
        }

        [HttpPost("Users/Save")]
        public Result SaveUser([FromBody] UserBlank userBlank)
        {
            return _usersService.SaveUser(userBlank, SystemUser.Id);
        }

        [HttpGet("Users/GetById")]
        public User? GetUser(Guid id)
        {
            return _usersService.GetUser(id);
        }

        [HttpGet("Users/GetPaged")]
        public PagedResult<User> GetPagedUsers(int page, int count)
        {
            return _usersService.GetPagedUsers(page, count);
        }

        [HttpPost("Users/Remove")]
        public Result RemoveUser([FromBody] Guid id)
        {
            return _usersService.RemoveUser(id);
        }
    }
}
