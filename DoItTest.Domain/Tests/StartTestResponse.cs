using DoItTest.Domain.Students;
using DoItTest.Domain.Tests.TestItems;

namespace DoItTest.Domain.Tests
{
    public record class StartTestResponse(Student Student, TestItem? TestItem);
}
