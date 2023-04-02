﻿using DoItTest.Domain.Tests;
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
        TestItem[] GetTestItems(Guid testId);
    }
}
