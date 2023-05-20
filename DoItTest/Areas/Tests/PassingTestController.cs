using DoItTest.Domain.Answers;
using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Site.Areas.Bases;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Tests
{
    public class PassingTestController : BaseController
    {
        private readonly ITestsService _testsService;
        public PassingTestController(ITestsService testsService)
        {
            _testsService = testsService;
        }

        [AllowAnonymous]
        [HttpGet("Tests/Passing/{testId}")]
        public IActionResult App() => ReactApp();

        [AllowAnonymous]
        [HttpPost("/Tests/AnswerQuestion")]
        public DataResult<TestItem?> AnswerQuestion([FromBody] AnswerBlank answerBlank)
        {
            return _testsService.AnswerQuestion(answerBlank);
        }

        public record StartTestRequest(StudentBlank StudentBlank, Guid TestId);
        [AllowAnonymous]
        [HttpPost("/Tests/Start")]
        public DataResult<StartTestResponse> StartTest([FromBody] StartTestRequest startTestRequest)
        {
            return _testsService.StartTest(startTestRequest.StudentBlank, startTestRequest.TestId);
        }

        public record FinishTestRequest(Guid StudentId, Guid TestId);
        [AllowAnonymous]
        [HttpPost("/Tests/Finish")]
        public Result FinishTest([FromBody] FinishTestRequest request)
        {
            return _testsService.FinishTest(request.TestId, request.StudentId);
        }

        [AllowAnonymous]
        [HttpGet("/Tests/GetItemForPassing")]
        public DataResult<TestItem?> GetItemForPassing(Guid studentId, Guid testId)
        {
            return _testsService.GetTestItemForPassing(studentId, testId);
        }

        [AllowAnonymous]
        [HttpGet("/Tests/GetInfo")]
        public TestInfo? GetTestInfo(Guid testId)
        {
            return _testsService.GetTestInfo(testId);
        }

        [AllowAnonymous]
        [HttpGet("/Tests/GetActiveTestId")]
        public Guid? GetActiveTestId(Guid studentId)
        {
            return _testsService.GetActiveTestId(studentId);
        }

        [AllowAnonymous]
        [HttpGet("/Tests/GetStartTestBeginDateTime")]
        public DateTime? GetStartTestBeginDateTime(Guid studentId, Guid testId)
        {
            return _testsService.GetStartTestBeginDateTime(testId, studentId);
        }
    }
}
