using DoItTest.Domain.Services;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
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
            return _testsService.SaveUser(request.TestBlank, request.TestItemBlanks, SystemUser.Id);
        }

        [HttpGet("/Tests/GetTest")]
        public Test? GetTest(Guid id)
        {
            return _testsService.GetTest(id);
        }

        [HttpGet("/Tests/GetPaged")]
        public PagedResult<Test> GetPagedTests(Int32 page, Int32 count)
        {
            return _testsService.GetPagedTests(SystemUser.Id, page, count);
        }

        [HttpPost("/Tests/Remove")]
        public Result RemoveTest([FromBody] Guid id)
        {
            return _testsService.RemoveTest(id, SystemUser.Id);
        }

        [HttpGet("/Tests/GetItems")]
        public TestItem[] GetTestItems(Guid testId)
        {
            return _testsService.GetTestItems(testId);
        }
    }
}
