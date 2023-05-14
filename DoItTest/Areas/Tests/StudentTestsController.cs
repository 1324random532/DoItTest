using DoItTest.Domain.Services;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Bases;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Tests
{
    public class StudentTestsController : BaseController
    {
        private readonly ITestsService _testsService;
        public StudentTestsController(ITestsService testsService)
        {
            _testsService = testsService;
        }

        [HttpGet("/StudentTests")]
        [HttpGet("/StudentTests/Info/{studentTestId}")]
        public IActionResult App() => ReactApp();

        [HttpGet("/StudentTests/GetStudentTest")]
        public StudentTest? GetStudentTest(Guid id)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetStudentTestById(id, userId);
        }

        [HttpPost("/StudentTests/GetPaged")]
        public PagedResult<StudentTest> GetPagedStudentTests([FromBody]StudentTestFilter filter)
        {
            filter.UserId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;

            return _testsService.GetPagedStudentTests(filter);
        }
    }
}
