using DoItTest.Domain.Answers;
using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Bases;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Tests
{
    public class TestsController : BaseController
    {
        private readonly ITestsService _testsService;
        public TestsController(ITestsService testsService)
        {
            _testsService = testsService;
        }

        [HttpGet("Tests")]
        [HttpGet("Tests/New")]
        [HttpGet("Tests/Edit/{testId}")]
        public IActionResult App() => ReactApp();

        public record SaveTestRequest(TestBlank TestBlank, TestItemBlank[] TestItemBlanks);

        [HttpPost("/Tests/Save")]
        public Result SaveTest([FromBody] SaveTestRequest request)
        {
            return _testsService.SaveTest(request.TestBlank, request.TestItemBlanks, SystemUser.Id);
        }

        [HttpPost("/Tests/BlockPassegeTest")]
        public Result BlockPassegeTest([FromBody] Guid id)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.BlockPassegeTest(id, userId);
        }

        [HttpPost("/Tests/Copy")]
        public DataResult<Guid> CopyTest([FromBody] Guid testId)
        {
            return _testsService.CopyTest(testId, SystemUser.Role, SystemUser.Id);
        }

        [HttpGet("/Tests/GetTest")]
        public Test? GetTest(Guid id)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetTest(id, userId);
        }

        [HttpGet("/Tests/GetTests")]
        public Test[] GetTests(Guid[] ids)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetTests(ids, userId);
        }

        [HttpGet("/Tests/GetTestsBySearchText")]
        public Test[] GetTests(String? searchText)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetTests(searchText, userId);
        }

        [HttpPost("/Tests/GetPaged")]
        public PagedResult<Test> GetPagedTests([FromBody] TestsFilter filter)
        {
            filter.UserId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetPagedTests(filter);
        }

        [HttpPost("/Tests/Remove")]
        public Result RemoveTest([FromBody] Guid id)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.RemoveTest(id, userId);
        }

        [HttpGet("/Tests/GetItems")]
        public TestItem[] GetTestItems(Guid testId)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetTestItems(testId, userId);
        }
    }
}
