using DoItTest.Domain.Answers;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Services.Answers.Repositories.Models;

namespace DoItTest.Services.Answers.Repositories.Converters
{
    internal static class AnswersConverter
    {

        public static Answer ToDomain(this AnswerDb db)
        {
            return new Answer(db.Id, db.StudentTestId, db.TestItemId, db.StringAnswer, db.NumberAnswer, db.AnswerOptionId, db.AnswerOptionIds, db.IsTrue);
        }

        public static Answer[] ToDomains(this AnswerDb[] dbs)
        {
            return dbs.Select(db => db.ToDomain()).ToArray();
        }
    }
}
