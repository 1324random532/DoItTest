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
        DataResult<Student> StartTest(StudentBlank studentBlank, Guid testId);
        Result SaveTest(TestBlank test, TestItemBlank[] testItems, Guid systemUserId);
        Test? GetTest(Guid id);
        PagedResult<Test> GetPagedTests(Guid userId, Int32 page, Int32 count, UserRole role );
        Result RemoveTest(Guid id, Guid userId);
        DataResult<TestItem?> GetTestItemForPassing(Guid studentId, Guid testId);
        TestItem[] GetTestItems(Guid testId, Boolean getAnswers = true);

        StudentTest? GetStudentTest(Guid testId, Guid studentId);

        TestInfo? GetTestInfo(Guid testId);
    }
}
