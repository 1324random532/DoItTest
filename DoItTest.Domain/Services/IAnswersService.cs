using DoItTest.Domain.Answers;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;

namespace DoItTest.Domain.Services
{
    public interface IAnswersService
    {
        void CreateAnswer(StudentTest studentTest, TestItem testItem);
        void SaveAnswer(Answer answer);
        Answer? GetActive(Guid studentTestId);
        Answer[] GetAnswers(Guid studentTestId, Guid? userId, Boolean withActive = false);
    }
}
