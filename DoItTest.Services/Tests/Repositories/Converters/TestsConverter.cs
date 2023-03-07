using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Tests.TestItems.AnswerOptions;
using DoItTest.Domain.Users;
using DoItTest.Services.Tests.Repositories.Models;
using DoItTest.Services.Users.Repositories.Models;

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
            return new Test(db.Id, db.UserId, db.Title);
        }

        public static TestItem[] ToTestItems(this IEnumerable<TestItemDb> dbs, AnserOptionDb[] allAnswerOptionDbs)
        {
            List<TestItem> testItems = new();
            var answerOptionDbsGroups = allAnswerOptionDbs.GroupBy(db => db.TestItemId).ToArray();

            foreach (var answerOptionDbsGroup in answerOptionDbsGroups)
            {
                TestItemDb testItemDb = dbs.First(db => db.Id == answerOptionDbsGroup.Key);

                TestItem testItem = testItemDb.ToTestItem(answerOptionDbsGroup.ToArray());
                testItems.Add(testItem);
            }

            return testItems.ToArray();
        }

        public static TestItem ToTestItem(this TestItemDb db, AnserOptionDb[] answerOptionDbs)
        {
            switch (db.Type)
            {
                case TestItemType.CheckboxesGroup:
                    {
                        List<CheckboxesAnswerOption> answerOptions = new();
                        foreach (AnserOptionDb anserOptionDb in answerOptionDbs)
                        {
                            CheckboxesAnswerOption answerOption = new(anserOptionDb.Id, anserOptionDb.TestItemId, anserOptionDb.Title!, anserOptionDb.IsTrue!.Value);
                            answerOptions.Add(answerOption);
                        }

                        return new CheckboxesItem(db.Id, db.TestId, db.Type, db.Question, answerOptions.ToArray());
                    }

                case TestItemType.RadioButtonsGroup:
                    {
                        List<RadioButtonAnserOption> answerOptions = new();
                        foreach (AnserOptionDb anserOptionDb in answerOptionDbs)
                        {
                            RadioButtonAnserOption answerOption = new(anserOptionDb.Id, anserOptionDb.TestItemId, anserOptionDb.Title!, anserOptionDb.IsTrue!.Value);
                            answerOptions.Add(answerOption);
                        }

                        return new RadioButtonItem(db.Id, db.TestId, db.Type, db.Question, answerOptions.ToArray());
                    }

                case TestItemType.TextField:
                    {
                        AnserOptionDb answerOptionDb = answerOptionDbs[0];

                        TextFildAnserOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.StringAnswer!);
                        return new TextFieldItem(db.Id, db.TestId, db.Type, db.Question, answerOption);
                    }

                case TestItemType.NumericField:
                    {
                        AnserOptionDb answerOptionDb = answerOptionDbs[0];

                        NumberAnswerOption answerOption = new(answerOptionDb.Id, answerOptionDb.TestItemId, answerOptionDb.NumberAnswer!.Value);
                        return new NumberFieldItem(db.Id, db.TestId, db.Type, db.Question, answerOption);
                    }
                default: throw new Exception("Неизвестный тип вопроса");
            }
        }
    }
}
