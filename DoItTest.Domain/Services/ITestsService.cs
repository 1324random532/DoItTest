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
        PagedResult<Test> GetPagedTests(Guid userId, Int32 page, Int32 count, UserRole role );
        Result RemoveTest(Guid id, Guid userId);

        TestItem[] GetTestItems(Guid testId, Boolean getAnswers = true);

        StudentTest? GetStudentTest(Guid studentId, Guid? testId = null);



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
