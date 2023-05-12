using DoItTest.Domain.Answers;
using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Tests.TestItems.AnswerOptions;
using DoItTest.Domain.Users;
using DoItTest.Services.Answers;
using DoItTest.Services.Students;
using DoItTest.Services.Tests.Repositories;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Services.Tests
{
	public class TestsService : ITestsService
	{
		private readonly TestsRepository _testsRepository;
		private readonly IAnswersService _answersService;
		private readonly IStudentsService _studetnsService;

		public TestsService(String connectionString)
		{
			_testsRepository = new TestsRepository(connectionString);
			_answersService = new AnswersService(connectionString);
			_studetnsService = new StudentsService(connectionString);
		}

		public Result SaveTest(TestBlank test, TestItemBlank[] testItems, Guid systemUserId)
		{
			if (String.IsNullOrEmpty(test.Title))
				return Result.Fail("Не указано название теста");

			if (test.TimeToCompleteInSeconds is null || test.TimeToCompleteInSeconds <= 0)
				return Result.Fail("Укажите количестов времени на тест");

			if (test.NumberOfPercentagesByFive is null)
				return Result.Fail("Укажите процент на 5");

			if (test.NumberOfPercentagesByFour is null)
				return Result.Fail("Укажите процент на 4");

			if (test.NumberOfPercentagesByThree is null)
				return Result.Fail("Укажите процент на 3");

			if (test.NumberOfPercentagesByThree >= test.NumberOfPercentagesByFour || test.NumberOfPercentagesByThree >= test.NumberOfPercentagesByFive)
				return Result.Fail("Процент на 3 должен быть меньше чем на 4 и 5");

			if (test.NumberOfPercentagesByFour >= test.NumberOfPercentagesByFive)
				return Result.Fail("Процент на 4 должен быть меньше чем на 5");

			if (test.Id is null) test.Id = Guid.NewGuid();

			if (test.UserId is null) test.UserId = systemUserId;

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

				if (testItem.Type == TestItemType.NumericField)
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

				foreach (AnswerOptionBlank answerOpttion in testItem.AnswerOptions)
				{
					if (String.IsNullOrEmpty(answerOpttion.Title)) return Result.Fail($"Не все ответы имеют заголовок у вопроса {testItemNumber}");

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

			if (testItem.Type == TestItemType.Comparison)
			{
				if (testItem.AnswerOptionGroups.Length == 0) return Result.Fail($"Вопрос {testItemNumber} должен иметь хотя бы 2 группы");

				List<AnswerOptionBlank> answerOptionBlanks = new();
				foreach (AnswerOptionGroupBlank answerOptionGroupBlank in testItem.AnswerOptionGroups)
				{
					if (String.IsNullOrEmpty(answerOptionGroupBlank.Name)) return Result.Fail($"Вопрос {testItemNumber} должен иметь название у всех групп");
					if (answerOptionGroupBlank.AnswerOptions.Length == 0) return Result.Fail($"У вопрос {testItemNumber} не у всех групп имеется элемент");

					if (answerOptionGroupBlank.Id is null) answerOptionGroupBlank.Id = Guid.NewGuid();

					List<AnswerOptionBlank> answerOptionBlanksFromGroup = new();

					foreach (AnswerOptionBlank answerOptionBlank in answerOptionGroupBlank.AnswerOptions)
					{
						if (String.IsNullOrEmpty(answerOptionBlank.Title)) return Result.Fail($"У вопрос {testItemNumber} не у всех элеменов групп имеются заголовки");
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

		public Test[] GetTests(Guid[] ids)
        {
			return _testsRepository.GetTests(ids);
        }

		public Test[] GetTests(String? searchText, Guid? userId)
		{
			return _testsRepository.GetTests(searchText, userId);
		}

		public PagedResult<Test> GetPagedTests(TestsFilter filter)
		{
			return _testsRepository.GetPagedTests(filter);
		}

		public Result RemoveTest(Guid id, Guid userId)
		{
			_testsRepository.RemoveTest(id, userId);
			return Result.Success();
		}

		public TestItem? GetTestItem(Guid? id)
        {
			return id is null ? null : _testsRepository.GetTestItem(id.Value, false);
        }

		public TestItem[] GetTestItems(Guid testId, Boolean getAnswers = true)
		{
			return _testsRepository.GetTestItems(testId, getAnswers);
		}

		public void SaveStudentTest(StudentTest studentTest, Guid? userId)
        {
			_testsRepository.SaveStudentTest(studentTest, userId);
		}

		public StudentTest? GetStudentTest(Guid studentId, Guid? testId = null)
		{
			return _testsRepository.GetStudentTest(studentId, testId );
		}

		public PagedResult<StudentTest> GetPagedStudentTests(StudentTestFilter filter)
		{
			return _testsRepository.GetPagedStudentTests(filter);
		}

		#region PassingTest

		public DataResult<TestItem?> AnswerQuestion(AnswerBlank answerBlank)
		{
			Student? student = _studetnsService.GetStudent(answerBlank.StudentId);
			if (student is null) return DataResult<TestItem?>.Failed("Студент не найден");

			Test? test = GetTest(answerBlank.TestId);
			if (test is null) return DataResult<TestItem?>.Failed("Тест не найден");

			StudentTest? studentTest = GetStudentTest(student.Id, test.Id);
			if (studentTest is null) throw new Exception("Не существует модели прохождения студента");

			if (studentTest.Status != StudentTestStatus.Passing) return DataResult<TestItem?>.Failed("Тест завершен");

			Answer? activeAnswer = _answersService.GetActive(studentTest.Id);
			if (activeAnswer is not null)
			{
				TestItem? activeTestItem = GetTestItem(activeAnswer.TestItemId);
				if (activeTestItem is null) throw new Exception("Для загатовленного ответа должен быть вопрос");

				Result validateResult = ValidateAndSetAnswer(activeAnswer, answerBlank, activeTestItem.Type);
				if (!validateResult.IsSuccess) return DataResult<TestItem?>.Failed(validateResult.Errors);

				_answersService.SaveAnswer(activeAnswer);
			}

			PrepareStudentTest(studentTest, test);

			return GetTestItemForPassing(student.Id, test.Id);
		}

		private Result ValidateAndSetAnswer(Answer answer, AnswerBlank answerBlank, TestItemType type)
		{
			Result missingAnswerError = Result.Fail("Укажите ответ");

			switch (type)
			{
				case TestItemType.TextField:
					{
						if (String.IsNullOrWhiteSpace(answerBlank.StringAnswer)) return missingAnswerError;
						answer.SetAnswer(answerBlank.StringAnswer);
						return Result.Success();
					}
				case TestItemType.NumericField:
					{
						if (answerBlank.NumberAnswer is null) return missingAnswerError;
						answer.SetAnswer(answerBlank.NumberAnswer.Value);
						return Result.Success();
					}
				case TestItemType.RadioButtonsGroup:
					{
						if (answerBlank.AnswerOptionId is null) return missingAnswerError;
						answer.SetAnswer(answerBlank.AnswerOptionId.Value);
						return Result.Success();
					}
				case TestItemType.CheckboxesGroup:
					{
						if (answerBlank.AnswerOptionIds.Length == 0) return missingAnswerError;
						answer.SetAnswer(answerBlank.AnswerOptionIds);
						return Result.Success();
					}
				default: throw new Exception("Неизвестный тип ответа");
			}
		}

		private void PrepareStudentTest(StudentTest studentTest, Test test)
		{
			TestItem[] testItems = GetTestItems(test.Id);
			Answer[] answers = _answersService.GetAnswers(studentTest.Id);

			List<Answer> correctAnswers = new();
			foreach (TestItem testItem in testItems)
			{
				Answer? answer = answers.FirstOrDefault(a => a.TestItemId == testItem.Id);
				if (answer is null) continue;

				switch (testItem.Type)
				{
					case TestItemType.TextField:
						{
							if (testItem is TextFieldItem textFieldItem)
							{
								if (textFieldItem.AnswerOption.Answer!.ToLower() == answer.StringAnswer.ToLower()) correctAnswers.Add(answer);
							}
							else throw new Exception("Вопрос и ответ должны быть текстовыми");
							break;
						}
					case TestItemType.NumericField:
						{
							if (testItem is NumberFieldItem numberFieldItem)
							{
								if (numberFieldItem.AnswerOption.Answer == answer.NumberAnswer) correctAnswers.Add(answer);
							}
							else throw new Exception("Вопрос и ответ должны быть числовыми");
							break;
						}
					case TestItemType.RadioButtonsGroup:
						{
							if (testItem is RadioButtonItem radioGroupItem)
							{
								if (radioGroupItem.AnswerOptions.First(o => o.IsTrue!.Value).Id == answer.AnswerOptionId) correctAnswers.Add(answer);
							}
							else throw new Exception("Вопрос и ответ должны быть \"Один из сиска\"");
							break;
						}
					case TestItemType.CheckboxesGroup:
						{
							if (testItem is CheckboxesItem checkboxesItem)
							{
								Guid[] truecheckboxesItemIds = checkboxesItem.AnswerOptions.Where(o => o.IsTrue!.Value).Select(o => o.Id).ToArray();
								Boolean isAnswerTrue = truecheckboxesItemIds.SequenceEqual(answer.AnswerOptionIds);
								if (isAnswerTrue) correctAnswers.Add(answer);

							}
							else throw new Exception("Вопрос и ответ должны быть \"Несколько из списка\"");
							break;
						}
					default: throw new Exception("Неизвестный тип enam");
				}

				studentTest.Prepare(test, correctAnswers.Count, testItems.Count());
				if (testItems.Count() == answers.Count()) studentTest.Finish();

				SaveStudentTest(studentTest, null);
			}
		}

		public DataResult<StartTestResponse> StartTest(StudentBlank studentBlank, Guid testId)
		{
			Test? test = GetTest(testId);
			if (test is null) return DataResult<StartTestResponse>.Failed("Тест не существует");

			DataResult<Guid> result = _studetnsService.SaveStudent(studentBlank, null);
			if (!result.IsSuccess) return DataResult<StartTestResponse>.Failed(result.Errors);
			Student student = new(result.Data, studentBlank.FirstName!, studentBlank.LastName!, studentBlank.Patronymic, studentBlank.Group!);

			DateTime beginDateTimeUtc = DateTime.UtcNow;
			DateTime maxEndDateTimeUtc = beginDateTimeUtc.AddSeconds(test.TimeToCompleteInSeconds);

			StudentTest studentTest = new(Guid.NewGuid(), test.Id, student.Id, 0, 2, beginDateTimeUtc, null, maxEndDateTimeUtc);
			SaveStudentTest(studentTest, null);

			DataResult<TestItem?> getTestItemForPassingResult = GetTestItemForPassing(studentTest.StudentId, studentTest.TestId);
			if (!getTestItemForPassingResult.IsSuccess) return DataResult<StartTestResponse>.Failed(getTestItemForPassingResult.Errors);

			StartTestResponse startTestResponse = new(student, getTestItemForPassingResult.Data);
			return DataResult<StartTestResponse>.Success(startTestResponse);
		}

		public Result FinishTest(Guid testId, Guid studentId)
		{
			StudentTest? studentTest = GetStudentTest(studentId, testId);
			if (studentTest is null) return Result.Fail("Тест не найдет");

			studentTest.Finish();
			SaveStudentTest(studentTest, null);
			return Result.Success();
		}

		public DataResult<TestItem?> GetTestItemForPassing(Guid studentId, Guid testId)
		{
			Student? student = _studetnsService.GetStudent(studentId);
			if (student is null) return DataResult<TestItem?>.Failed("Студент не найден");

			Test? test = GetTest(testId);
			if (test is null) return DataResult<TestItem?>.Failed("Тест не найден");

			StudentTest? studentTest = GetStudentTest(student.Id, test.Id);
			if (studentTest is null) throw new Exception("Не существует модели прохождения студента");

			TestItem[] testItems = GetNotPassedTestItems(studentTest.Id);
			if (testItems.Length == 0) return DataResult<TestItem?>.Success(null);

			TestItem? testItem = null;
			Answer? answerBlank = _answersService.GetActive(studentTest.Id);
			if (answerBlank is not null)
			{
				testItem = testItems.First(i => i.Id == answerBlank.TestItemId);
			}
			else
			{
				Random random = new Random();
				Int32 randomIndex = random.Next(0, testItems.Length);

				testItem = testItems[randomIndex];
				_answersService.CreateAnswer(studentTest, testItem);
			}

			return DataResult<TestItem?>.Success(testItem);
		}

		private TestItem[] GetNotPassedTestItems(Guid studentTestId)
		{
			TestItem[] testItems = _testsRepository.GetTestItemsByStudentTestId(studentTestId, false);
			Answer[] answers = _answersService.GetAnswers(studentTestId);
			List<TestItem> notPassedTestItems = new();

			foreach (TestItem testItem in testItems)
			{
				Answer? answer = answers.FirstOrDefault(a => a.TestItemId == testItem.Id);
				if (answer is not null && answer.IsAnswered) continue;

				notPassedTestItems.Add(testItem);
			}


			return notPassedTestItems.ToArray();
		}

		public TestInfo? GetTestInfo(Guid testId)
		{
			Test? test = _testsRepository.GetTest(testId);
			if (test is null) return null;

			return new TestInfo(test.Id, test.Title, test.TimeToCompleteInSeconds);
		}

		public Guid? GetActiveTestId(Guid studentId)
        {
			StudentTest? studentTest = GetStudentTest(studentId);
			if (studentTest is null) return null;

			Test? test = GetTest(studentTest.TestId);
			if (test is null) return null;

			return test.Id;
        }

		public DateTime? GetStartTestBeginDateTime(Guid testId, Guid studentId)
		{
			StudentTest? studentTest = GetStudentTest(studentId, testId);
			return studentTest?.BeginDateTime;
		}

        #endregion PassingTest
    }
}
