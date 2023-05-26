using DoItTest.Domain.Answers;
using DoItTest.Domain.Services;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Services.Answers.Repositories;

namespace DoItTest.Services.Answers
{
    public class AnswersService: IAnswersService
	{
		private readonly AnswersRepository _answersRepository;

		public AnswersService(String connectionString)
		{
			_answersRepository = new AnswersRepository(connectionString);
		}


		public void CreateAnswer(StudentTest studentTest, TestItem testItem)
        {
			Answer answer = new(Guid.NewGuid(), studentTest.Id, testItem.Id, null, null, null, new Guid[] { }, new AnswerGroup[] {}, false);

			_answersRepository.SaveAnswer(answer, true, null);
		}

		public void SaveAnswer(Answer answer)
		{
			_answersRepository.SaveAnswer(answer, false, null);
		}

		public Answer? GetActive(Guid studentTestId)
        {
			return _answersRepository.GetActive(studentTestId);
        }

		public Answer[] GetAnswers(Guid studentTestId, Guid? userId, Boolean withActive = false)
		{
			return _answersRepository.GetAnswers(studentTestId, userId, withActive);
		}
	}
}
