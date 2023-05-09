using Dapper;
using DoItTest.Domain.Answers;
using DoItTest.Services.Answers.Repositories.Converters;
using DoItTest.Services.Answers.Repositories.Models;
using Npgsql;
using System.Data;

namespace DoItTest.Services.Answers.Repositories
{
    public class AnswersRepository
    {
        public String ConnectionString { get; }

        public AnswersRepository(String connectionSettings)
        {
            ConnectionString = connectionSettings;
        }

        public void SaveAnswer(Answer answer, Boolean isActive, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"INSERT INTO answers(id, studenttestid, testitemid, stringanswer, numberanswer, answeroptionid, answeroptionids, isactive, createddatetimeutc) " +
                    $"VALUES(@Id, @StudentTestId, @TestItemId, @StringAnswer, @NumberAnswer, @AnswerOptionId, @AnswerOptionIds, @IsActive, @DateTime) " +
                    $"ON " +
                    $"CONFLICT(id) DO " +
                    $"UPDATE " +
                    $"SET id = @Id, studenttestid = @StudentTestId, testitemid = @TestItemId, stringanswer = @StringAnswer, numberanswer = @NumberAnswer, " +
                    $"answeroptionid = @AnswerOptionId, answeroptionids = @AnswerOptionIds, isactive = @IsActive, modifieduserid = @Userid, modifieddatetimeutc = @Datetime;";

                var parameters = new
                {
                    Id = answer.Id,
                    StudentTestId = answer.StudentTestId,
                    TestItemId = answer.TestItemId,
                    StringAnswer = answer.StringAnswer,
                    NumberAnswer = answer.NumberAnswer,
                    AnswerOptionId = answer.AnswerOptionId,
                    AnswerOptionIds = answer.AnswerOptionIds,
                    IsActive = isActive,
                    Userid = userId,
                    Datetime = DateTime.UtcNow
                };

                db.Execute(query, parameters);
            }
        }

        public Answer? GetActive(Guid studentTestId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT a.* " +
                    $"FROM answers a JOIN studenttests t ON a.studenttestid = t.id AND NOT t.isremoved " +
                    $"WHERE t.id=@StudentTestId " +
                    $"  AND a.isactive " +
                    $"  AND NOT a.isremoved;";

                var parameters = new
                {
                    StudentTestId = studentTestId
                };

                return db.Query<AnswerDb>(query, parameters).FirstOrDefault()?.ToDomain();
            }
        }

        public Answer[] GetAnswers(Guid studentTestId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                using (var transaction = db.BeginTransaction())
                {
                    String query = $"SELECT * " +
                    $"FROM answers " +              
                    $"WHERE studenttestid = @StudentTestId " +
                    $"  AND NOT isactive" +
                    $"  AND NOT isremoved;";

                    var parameters = new
                    {
                        StudentTestId = studentTestId
                    };                   

                    return db.Query<AnswerDb>(query, parameters).ToArray().ToDomains();
                }
            }
        }
    }
}
