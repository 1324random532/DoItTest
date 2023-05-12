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
        [HttpGet("Tests/Passing/{testId}")]
        public IActionResult App() => ReactApp();

        [HttpPost("/Tests/AnswerQuestion")]
        public DataResult<TestItem?> AnswerQuestion([FromBody] AnswerBlank answerBlank)
        {
            return _testsService.AnswerQuestion(answerBlank);
        }

        public record StartTestRequest(StudentBlank StudentBlank, Guid TestId);
        [HttpPost("/Tests/Start")]
        public DataResult<StartTestResponse> StartTest([FromBody] StartTestRequest startTestRequest)
        {
            return _testsService.StartTest(startTestRequest.StudentBlank, startTestRequest.TestId);
        }

        public record FinishTestRequest(Guid StudentId, Guid TestId);
        [HttpPost("/Tests/Finish")]
        public Result FinishTest([FromBody] FinishTestRequest request)
        {
            return _testsService.FinishTest(request.TestId, request.StudentId);
        }

        public record SaveTestRequest(TestBlank TestBlank, TestItemBlank[] TestItemBlanks);

        [HttpPost("/Tests/Save")]
        public Result SaveTest([FromBody] SaveTestRequest request)
        {
            return _testsService.SaveTest(request.TestBlank, request.TestItemBlanks, SystemUser.Id);
        }

        [HttpGet("/Tests/GetTest")]
        public Test? GetTest(Guid id)
        {
            return _testsService.GetTest(id);
        }

        [HttpGet("/Tests/GetTests")]
        public Test[] GetTests(Guid[] ids)
        {
            return _testsService.GetTests(ids);
        }

        [HttpGet("/Tests/GetTestsBySearchText")]
        public Test[] GetTests(String? serchText)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _testsService.GetTests(serchText, userId);
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
            return _testsService.RemoveTest(id, SystemUser.Id);
        }

        [HttpGet("/Tests/GetItemForPassing")]
        public DataResult<TestItem?> GetItemForPassing(Guid studentId, Guid testId)
        {
            return _testsService.GetTestItemForPassing(studentId, testId);
        }

        [HttpGet("/Tests/GetItems")]
        public TestItem[] GetTestItems(Guid testId)
        {
            return _testsService.GetTestItems(testId);
        }

        //[HttpGet("/Tests/GetStudentTest")]
        //public StudentTest? GetStudentTest(Guid testId, Guid studentId)
        //{
        //    return _testsService.GetStudentTest(testId, studentId);
        //}

        [HttpGet("/Tests/GetInfo")]
        public TestInfo? GetTestInfo(Guid testId)
        {
            return _testsService.GetTestInfo(testId);
        }

        [HttpGet("/Tests/GetActiveTestId")]
        public Guid? GetActiveTestId(Guid studentId)
        {
            return _testsService.GetActiveTestId(studentId);
        }

        [HttpGet("/Tests/GetStartTestBeginDateTime")]
        public DateTime? GetStartTestBeginDateTime(Guid studentId, Guid testId)
        {
            return _testsService.GetStartTestBeginDateTime(testId, studentId);
        }
    }
}
