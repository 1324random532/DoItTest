using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Domain.Services
{
    public interface ITestsService
    {
        Result SaveUser(TestBlank test, TestItemBlank[] testItems, Guid systemUserId);
        Test? GetTest(Guid id);
        PagedResult<Test> GetPagedTests(Guid userId, Int32 page, Int32 count );
        Result RemoveTest(Guid id, Guid userId);
        TestItem[] GetTestItems(Guid testId);
    }
}
