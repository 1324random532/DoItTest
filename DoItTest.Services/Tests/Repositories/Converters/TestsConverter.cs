using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Tests.TestItems.AnswerOptions;
using DoItTest.Domain.Users;
using DoItTest.Services.Tests.Repositories.Models;
using DoItTest.Services.Users.Repositories.Models;
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
                            AnswerOptionGroup answerOptionGroup = new(groupAnswerOption.Key, firstAnswerOption.TestItemId, firstAnswerOption.Type, firstAnswerOption.GroupName, groupAnswerOption.ToArray());
                            answerOptionGroups.Add(answerOptionGroup);
                        }

                        return new ComparisonItem(db.Id, db.TestId, db.Type, db.Question, db.ImageBase64, answerOptionGroups.ToArray());
                    }

                default: throw new Exception("Неизвестный тип вопроса");
            }
        }

        public static StudentTest ToStudentTest(this StudentTestDb db)
        {
            return new StudentTest(db.Id, db.TestId, db.StudentId, db.PercentageOfCorrectAnswers, db.Estimation, db.BeginDateTime, db.EndDateTime,  db.IsExpired);
        }
    }
}
