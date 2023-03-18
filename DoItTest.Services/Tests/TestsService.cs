using DoItTest.Domain.Services;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Tests.TestItems.AnswerOptions;
using DoItTest.Domain.Users;
using DoItTest.Services.Tests.Repositories;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Services.Tests
{
    public class TestsService: ITestsService
    {
		private readonly TestsRepository _testsRepository;

		public TestsService(String connectionString)
		{
			_testsRepository = new TestsRepository(connectionString);
		}

		public Result SaveUser(TestBlank test, TestItemBlank[] testItems, Guid systemUserId)
		{
			if (String.IsNullOrWhiteSpace(test.Title))
				return Result.Fail("Не указано название теста");

			if (test.Id is null) test.Id = Guid.NewGuid();

			if(test.UserId is null) test.UserId = systemUserId;

			Int32 index = 1;
			foreach (TestItemBlank testItem in testItems)
            {

				testItem.TestId = test.Id;
				Result result = ValidateTestItem(testItem, index);
				if (!result.IsSuccess) return result;

				index++;
			}

			_testsRepository.SaveTest(test, testItems);
			return Result.Success();
		}

		private Result ValidateTestItem(TestItemBlank testItem, Int32 index)
        {
			String testItemNumber = $"№{index}";

			if (testItem.TestId is null) throw new Exception($"У вопроса {testItemNumber} отсутствует идентификатор теста");

			if (testItem.Type is null) return Result.Fail($"У вопроса {testItemNumber} отсутсвует тип вопроса");

			if (testItem.Id is null) testItem.Id = Guid.NewGuid();

			if (testItem.Type == TestItemType.NumericField || testItem.Type == TestItemType.TextField)
            {
				if (testItem.AnswerOption is null) return Result.Fail($"У вопроса {testItemNumber} не указан ответ");
				
				if(testItem.Type == TestItemType.NumericField)
                {
					if (testItem.AnswerOption.NumberAnswer is null) return Result.Fail($"У вопроса {testItemNumber} не указан ответ");
				}

				if (testItem.Type == TestItemType.TextField)
                {
					if (String.IsNullOrEmpty(testItem.AnswerOption.StringAnswer)) return Result.Fail($"У вопроса {testItemNumber} не указан ответ");
				}

				if (testItem.AnswerOption.Id is null) testItem.AnswerOption.Id = Guid.NewGuid();
				if (testItem.AnswerOption.TestItemId is null) testItem.AnswerOption.TestItemId = testItem.Id;
			}

			if (testItem.Type == TestItemType.RadioButtonsGroup || testItem.Type == TestItemType.CheckboxesGroup)
            {
				if (testItem.AnswerOptions.Length < 2) return Result.Fail($"Укажите хотябы два ответа у вопроса {testItemNumber}");

				foreach(AnswerOptionBlank answerOpttion in testItem.AnswerOptions)
                {
					if(String.IsNullOrEmpty(answerOpttion.Title)) return Result.Fail($"Не все ответы имеют заголовок у вопроса {testItemNumber}");

					if (answerOpttion.Id is null) answerOpttion.Id = Guid.NewGuid();
					if (answerOpttion.TestItemId is null) answerOpttion.TestItemId = testItem.Id;
				}

				AnswerOptionBlank[] nullableAnswerOpttions = testItem.AnswerOptions.Where(a => a.IsTrue is null).ToArray();
				if (nullableAnswerOpttions.Length != 0) throw new Exception("У вариантов ответа не может быть isTrue == null");

				AnswerOptionBlank[] trueAnswerOpttions = testItem.AnswerOptions.Where(a => a.IsTrue!.Value).ToArray();
				if (testItem.Type == TestItemType.RadioButtonsGroup)
                {
					if (trueAnswerOpttions.Length != 1) return Result.Fail($"Вопрос {testItemNumber} должен иметь 1 верный ответ");
                }

                if (testItem.Type == TestItemType.CheckboxesGroup)
                {
					if (trueAnswerOpttions.Length < 1) return Result.Fail($"Вопрос {testItemNumber} должен иметь 1 хотя бы верный ответ");
                }
			}

			if(testItem.Type == TestItemType.Comparison)
            {
				if(testItem.AnswerOptionGroups.Length == 0) return Result.Fail($"Вопрос {testItemNumber} должен иметь хотя бы 2 группы");

				List<AnswerOptionBlank> answerOptionBlanks = new();
				foreach (AnswerOptionGroupBlank answerOptionGroupBlank in testItem.AnswerOptionGroups)
				{
					if(String.IsNullOrEmpty(answerOptionGroupBlank.Name)) return Result.Fail($"Вопрос {testItemNumber} должен иметь название у всех групп");
					if(answerOptionGroupBlank.AnswerOptions.Length == 0) return Result.Fail($"У вопрос {testItemNumber} не у всех групп имеется элемент");

					if (answerOptionGroupBlank.Id is null) answerOptionGroupBlank.Id = Guid.NewGuid();

					List<AnswerOptionBlank> answerOptionBlanksFromGroup = new();
					
					foreach(AnswerOptionBlank answerOptionBlank in answerOptionGroupBlank.AnswerOptions)
                    {
						if(String.IsNullOrEmpty(answerOptionBlank.Title)) return Result.Fail($"У вопрос {testItemNumber} не у всех элеменов групп имеются заголовки");
						answerOptionBlanksFromGroup.Add(
							new AnswerOptionBlank()
							{
								Id = answerOptionBlank.Id ?? Guid.NewGuid(),
								TestItemId = answerOptionBlank.TestItemId ?? testItem.Id,
								Type = answerOptionBlank.Type,
								GroupId = answerOptionGroupBlank.Id,
								GroupName = answerOptionGroupBlank.Name,
								Title = answerOptionBlank.Title
							});
					}

					answerOptionBlanks.AddRange(answerOptionBlanksFromGroup);
				}
				testItem.AnswerOptions = answerOptionBlanks.ToArray();
			}

			return Result.Success();
        }

		public Test? GetTest(Guid id)
        {
			return _testsRepository.GetTest(id);
        }

		public PagedResult<Test> GetPagedTests(Guid userId, Int32 page, Int32 count, UserRole role)
		{
			return _testsRepository.GetPagedTests(page, count, role == UserRole.Super ? null: userId);
		}

		public Result RemoveTest(Guid id, Guid userId)
		{
			_testsRepository.RemoveTest(id, userId);
			return Result.Success();
		}

		public TestItem[] GetTestItems(Guid testId)
		{
			return _testsRepository.GetTestItems(testId);
		}
	}
}
