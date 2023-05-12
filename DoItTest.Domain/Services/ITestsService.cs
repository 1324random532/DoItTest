using DoItTest.Domain.Answers;
using DoItTest.Domain.Students;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Users;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Domain.Services
{
    public interface ITestsService
    {
        Result SaveTest(TestBlank test, TestItemBlank[] testItems, Guid systemUserId);
        Test? GetTest(Guid id);
        Test[] GetTests(Guid[] ids);
        Test[] GetTests(String? searchText, Guid? userId);
        PagedResult<Test> GetPagedTests(TestsFilter testsFilter);
        Result RemoveTest(Guid id, Guid userId);

        TestItem[] GetTestItems(Guid testId, Boolean getAnswers = true);

        StudentTest? GetStudentTest(Guid studentId, Guid? testId = null);
        PagedResult<StudentTest> GetPagedStudentTests(StudentTestFilter filter);



        #region PaasingTest
        DataResult<TestItem?> AnswerQuestion(AnswerBlank answerBlank);
        DataResult<StartTestResponse> StartTest(StudentBlank studentBlank, Guid testId);
        Result FinishTest(Guid testId, Guid studentId);
        DataResult<TestItem?> GetTestItemForPassing(Guid studentId, Guid testId);
        TestInfo? GetTestInfo(Guid testId);
        Guid? GetActiveTestId(Guid studentId);
        DateTime? GetStartTestBeginDateTime(Guid testId, Guid studentId);

        #endregion PassingTest
    }
}
