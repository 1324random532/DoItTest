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
        Result BlockPassegeTest(Guid id, Guid? userId);
        DataResult<Guid> CopyTest(Guid testId, UserRole userRole, Guid userId);
        Test? GetTest(Guid id, Guid? userId);
        Test[] GetTests(Guid[] ids, Guid? userId);
        Test[] GetTests(String? searchText, Guid? userId);
        PagedResult<Test> GetPagedTests(TestsFilter testsFilter);
        Result RemoveTest(Guid id, Guid? userId);

        TestItem[] GetTestItems(Guid testId, Guid? userId, Boolean getAnswers = true);

        StudentTest? GetStudentTestById(Guid id, Guid? userId);
        StudentTest? GetStudentTest(Guid studentId, Guid? testId = null);
        PagedResult<StudentTest> GetPagedStudentTests(StudentTestFilter filter);
        Result RemoveStudentTest(Guid id, Guid? userId);

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
