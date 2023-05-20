using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Tests.TestItems.AnswerOptions;
using DoItTest.Domain.Users;
using DoItTest.Services.Tests.Repositories.Models;
using DoItTest.Services.Users.Repositories.Models;
using DoItTest.Tools.Extensions;
using DoItTest.Tools.Types;

namespace DoItTest.Services.Tests.Repositories.Converters
{
    internal static class TestsConverter
    {
        public static Test[] ToTests(this IEnumerable<TestDb> dbs)
        {
            return dbs.Select(ToTest).ToArray();
        }

        public static Test ToTest(this TestDb db)
        {
            return new Test(db.Id, db.UserId, db.Title, db.TimeToCompleteInSeconds, db.NumberOfPercentagesByFive, db.NumberOfPercentagesByFour, db.NumberOfPercentagesByThree);
        }

        public static TestItem[] ToTestItems(this IEnumerable<TestItemDb> dbs, AnswerOptionDb[] allAnswerOptionDbs, Boolean getAnswers)
        {
            List<TestItem> testItems = new();
            var answerOptionDbsGroups = allAnswerOptionDbs.GroupBy(db => db.TestItemId).ToArray();

            foreach (var answerOptionDbsGroup in answerOptionDbsGroups)
            {
                TestItemDb testItemDb = dbs.First(db => db.Id == answerOptionDbsGroup.Key);

                TestItem testItem = testItemDb.ToTestItem(answerOptionDbsGroup.ToArray(), getAnswers);
                testItems.Add(testItem);
            }

            return testItems.ToArray();
        }

        public static TestItem ToTestItem(this TestItemDb db, AnswerOptionDb[] answerOptionDbs, Boolean getAnswers)
        {
            switch (db.Type)
            {
                case TestItemType.CheckboxesGroup:
                    {
                        List<CheckboxesAnswerOption> answerOptions = new();
                        foreach (AnswerOptionDb answerOptionDb in answerOptionDbs)
                        {
                            CheckboxesAnswerOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.Type, answerOptionDb.Title!, getAnswers ? answerOptionDb.IsTrue!.Value : null);
                            answerOptions.Add(answerOption);
                        }

                        return new CheckboxesItem(db.Id, db.TestId, db.Type, db.Question, db.ImageBase64, answerOptions.ToArray());
                    }

                case TestItemType.RadioButtonsGroup:
                    {
                        List<RadioButtonAnswerOption> answerOptions = new();
                        foreach (AnswerOptionDb answerOptionDb in answerOptionDbs)
                        {
                            RadioButtonAnswerOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.Type, answerOptionDb.Title!, getAnswers ? answerOptionDb.IsTrue!.Value: null);
                            answerOptions.Add(answerOption);
                        }

                        return new RadioButtonItem(db.Id, db.TestId, db.Type, db.Question, db.ImageBase64, answerOptions.ToArray());
                    }

                case TestItemType.TextField:
                    {
                        AnswerOptionDb answerOptionDb = answerOptionDbs[0];

                        TextFildAnswerOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.Type, getAnswers ? answerOptionDb.StringAnswer! : null);
                        return new TextFieldItem(db.Id, db.TestId, db.Type, db.Question, db.ImageBase64, answerOption);
                    }

                case TestItemType.NumericField:
                    {
                        AnswerOptionDb answerOptionDb = answerOptionDbs[0];

                        NumberAnswerOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.Type, getAnswers ? answerOptionDb.NumberAnswer!.Value : null);
                        return new NumberFieldItem(db.Id, db.TestId, db.Type, db.Question, db.ImageBase64, answerOption);
                    }

                case TestItemType.Comparison:
                    {
                        List<ComparisonAnswerOption> answerOptions = new();
                        List<AnswerOptionGroup> answerOptionGroups = new();
                        foreach (AnswerOptionDb answerOptionDb in answerOptionDbs)
                        {
                            ComparisonAnswerOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.Type, answerOptionDb.GroupId!.Value, answerOptionDb.GroupName!, answerOptionDb.Title!);
                            answerOptions.Add(answerOption);
                        }

                        var groupAnswerOptions = answerOptions.GroupBy(o => o.GroupId).ToArray();

                        foreach (var groupAnswerOption in groupAnswerOptions)
                        {
                            ComparisonAnswerOption firstAnswerOption = groupAnswerOption.First();
                            AnswerOptionGroup answerOptionGroup = new(groupAnswerOption.Key!.Value, firstAnswerOption.TestItemId, firstAnswerOption.Type, firstAnswerOption.GroupName, getAnswers ? groupAnswerOption.ToArray() : Array.Empty<AnswerOptionGroup>());
                            answerOptionGroups.Add(answerOptionGroup);
                        }

                        ComparisonAnswerOption[] fixedAnswerOptions = answerOptions.ToArray();

                        if (!getAnswers)
                        {
                            foreach(ComparisonAnswerOption comparisonAnswer in fixedAnswerOptions)
                            {
                                comparisonAnswer.ClearGroup();
                            }

                            fixedAnswerOptions.Shuffle();
                            // рандомизация ответов
                        }
                        else
                        {
                            fixedAnswerOptions = Array.Empty<ComparisonAnswerOption>();
                        }

                        return new ComparisonItem(db.Id, db.TestId, db.Type, db.Question, db.ImageBase64, answerOptionGroups.ToArray(), fixedAnswerOptions.ToArray());
                    }

                default: throw new Exception("Неизвестный тип вопроса");
            }
        }

        public static TestItemBlank[] ToBlanks(this TestItem[] items)
        {
            return items.Select(i => i.ToBlank()).ToArray();
        }

        public static TestItemBlank ToBlank(this TestItem item)
        {
            TestItemBlank testItemBlank = new()
            {
                Id = item.Id,
                TestId = item.TestId,
                Type = item.Type,
                Question = item.Question,
                ImageBase64 = item.ImageBase64
            };


            switch (item)
            {
                case TextFieldItem textFieldItem:
                    {
                        testItemBlank.AnswerOption = textFieldItem.AnswerOption.ToBlank();
                        break;
                    }
                case NumberFieldItem numberFieldItem:
                    {
                        testItemBlank.AnswerOption = numberFieldItem.AnswerOption.ToBlank();
                        break;
                    }
                case RadioButtonItem radioButtonItem:
                    {
                        testItemBlank.AnswerOptions = radioButtonItem.AnswerOptions.ToBlanks();
                        break;
                    }
                case CheckboxesItem checkboxesItem:
                    {
                        testItemBlank.AnswerOptions = checkboxesItem.AnswerOptions.ToBlanks();
                        break;
                    }
                case ComparisonItem comparisonItem:
                    {
                        testItemBlank.AnswerOptionGroups = comparisonItem.AnswerOptionGroups.Select(g => 
                        new AnswerOptionGroupBlank()
                        {
                            Id = g.Id,
                            Name = g.Name,
                            AnswerOptions = g.AnswerOptions.ToBlanks()
                        }
                        ).ToArray();
                        break;
                    }
            }

            return testItemBlank;
        }

        public static AnswerOptionBlank[] ToBlanks(this AnswerOption[] answerOptions)
        {
            return answerOptions.Select(o => o.ToBlank()).ToArray();
        }

        public static AnswerOptionBlank ToBlank(this AnswerOption answerOption)
        {
            AnswerOptionBlank answerOptionBlank = new()
            {
                Id = answerOption.Id,
                TestItemId = answerOption.TestItemId,
                Type = answerOption.Type,
            };

            switch (answerOption)
            {
                case TextFildAnswerOption textFildAnswerOption:
                    {
                        answerOptionBlank.StringAnswer = textFildAnswerOption.Answer;
                        break;
                    }
                case NumberAnswerOption numberAnswerOption:
                        {
                        answerOptionBlank.NumberAnswer = numberAnswerOption.Answer;
                        break;
                    }
                case RadioButtonAnswerOption radioButtonAnswerOption:
                    {
                        answerOptionBlank.Title = radioButtonAnswerOption.Title;
                        answerOptionBlank.IsTrue = radioButtonAnswerOption.IsTrue;
                        break;
                    }
                case CheckboxesAnswerOption checkboxesAnswerOption:
                    {
                        answerOptionBlank.Title = checkboxesAnswerOption.Title;
                        answerOptionBlank.IsTrue = checkboxesAnswerOption.IsTrue;
                        break;
                    }
                case ComparisonAnswerOption comparisonAnswerOption:
                    {
                        answerOptionBlank.Title = comparisonAnswerOption.Title;
                        answerOptionBlank.GroupId = comparisonAnswerOption.GroupId;
                        answerOptionBlank.GroupName = comparisonAnswerOption.GroupName;
                        break;
                    }
                case AnswerOptionGroup: break;
                default: throw new Exception("Неизвестный тип");
            }

            return answerOptionBlank;
        }

        public static StudentTest ToStudentTest(this StudentTestDb db)
        {
            return new StudentTest(db.Id, db.TestId, db.StudentId, db.PercentageOfCorrectAnswers, db.Estimation, db.BeginDateTime, db.EndDateTime, db.MaxEndDateTime);
        }

        public static StudentTest[] ToStudentTests(this StudentTestDb[] dbs)
        {
            return dbs.Select(db => db.ToStudentTest()).ToArray();
        }
    }
}
