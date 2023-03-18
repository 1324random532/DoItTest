using Dapper;
using DoItTest.Domain.Tests;
using DoItTest.Domain.Tests.TestItems;
using DoItTest.Domain.Tests.TestItems.AnswerOptions;
using DoItTest.Services.Tests.Repositories.Converters;
using DoItTest.Services.Tests.Repositories.Models;
using DoItTest.Tools.Types.Results;
using Npgsql;
using System.Data;

namespace DoItTest.Services.Tests.Repositories
{
    public class TestsRepository
    {
        public string ConnectionString { get; }

        public TestsRepository(string connectionSettings)
        {
            ConnectionString = connectionSettings;
        }

        public void SaveTest(TestBlank test, TestItemBlank[] testItems)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                using (var transaction = db.BeginTransaction())
                {
                    String deleteTestQuery = $"DELETE FROM tests " +
                    $"WHERE id = @Id " +
                    $"AND NOT isremoved;";

                    String deleteTestItemsQuery = $"DELETE FROM testitems i " +
                    $"WHERE i.testid = @Id " +
                    $"AND NOT isremoved;";

                    var deleteTestParameters = new
                    {
                        test.Id
                    };

                    String deleteTestItemAnswersQuery = $"DELETE FROM testitemansweroptions " +
                    $"WHERE testitemid = ANY(@TestItemIds) " +
                    $"AND NOT isremoved;";

                    var deleteTestItemAnswersParameters = new
                    {
                        TestItemIds = testItems.Select(i => i.Id!).ToArray()
                    };

                    String saveTestQuery = $"INSERT INTO tests (id, userid, title) " +
                    $"VALUES(@Id,@UserId,@Title);";

                    var saveTestparameters = new
                    {
                        test.Id,
                        test.UserId,
                        test.Title,
                    };

                    String saveTestItemQuery = $"INSERT INTO testitems(id, testid, type, " +
                    $"question, imageBase64) " +
                    $"VALUES(@Id, @TestId, @Type, @Question, @ImageBase64) ";

                    String saveTestItemAnswerOptionQuery = $"INSERT INTO testitemansweroptions(id, testitemid, type," +
                    $"stringanswer, numberanswer, title, istrue, groupid, groupname) " +
                    $"VALUES(@Id, @TestItemId, @Type, @StringAnswer, @NumberAnswer, @Title, " +
                    $"@IsTrue, @GroupId, @GroupName) ";

                    db.Execute(deleteTestQuery, deleteTestParameters, transaction: transaction);
                    db.Execute(deleteTestItemsQuery, deleteTestParameters, transaction: transaction);
                    db.Execute(deleteTestItemAnswersQuery, deleteTestItemAnswersParameters, transaction: transaction);

                    db.Execute(saveTestQuery, saveTestparameters, transaction: transaction);

                    foreach (TestItemBlank testItem in testItems)
                    {
                        var saveTestItemsParameters = new
                        {
                            testItem.Id,
                            testItem.TestId,
                            testItem.Type,
                            testItem.Question,
                            testItem.ImageBase64
                        };

                        db.Execute(saveTestItemQuery, saveTestItemsParameters, transaction: transaction);

                        if(testItem.AnswerOption is not null)
                        {
                            var saveTestItemAnswerParameters = new
                            {
                                testItem.AnswerOption.Id,
                                testItem.AnswerOption.TestItemId,
                                testItem.AnswerOption.Type,
                                testItem.AnswerOption.StringAnswer,
                                testItem.AnswerOption.NumberAnswer,
                                testItem.AnswerOption.Title,
                                testItem.AnswerOption.IsTrue,
                                testItem.AnswerOption.GroupId,
                                testItem.AnswerOption.GroupName
                            };
                            db.Execute(saveTestItemAnswerOptionQuery, saveTestItemAnswerParameters, transaction: transaction);
                        }

                        foreach (AnswerOptionBlank answerOpttion in testItem.AnswerOptions)
                        {
                            var saveTestItemAnswerParameters = new
                            {
                                answerOpttion.Id,
                                answerOpttion.TestItemId,
                                answerOpttion.Type,
                                answerOpttion.StringAnswer,
                                answerOpttion.NumberAnswer,
                                answerOpttion.Title,
                                answerOpttion.IsTrue,
                                answerOpttion.GroupId,
                                answerOpttion.GroupName
                            };

                            db.Execute(saveTestItemAnswerOptionQuery, saveTestItemAnswerParameters, transaction: transaction);
                        }
                    }

                    transaction.Commit();
                }
            }
        }

        public Test? GetTest(Guid id)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM tests " +
                    $"WHERE id=@Id " +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    Id = id
                };

                return db.Query<TestDb>(query, parameters).FirstOrDefault()?.ToTest();
            }
        }

        public PagedResult<Test> GetPagedTests(Int32 page, Int32 count, Guid userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT *,COUNT(*) OVER() AS FullCount " +
                    $"FROM tests " +
                    $"WHERE userid = @UserId " +
                    $"  AND NOT isremoved " +
                    $"  OFFSET @Offset " +
                    $"  LIMIT @Limit ";

                var parameters = new
                {
                    UserId = userId,
                    Offset = Math.Max((page - 1) * count, 0),
                    Limit = Math.Max(count, 0)
                };

                TestDb[] testDbs = db.Query<TestDb>(query, parameters).ToArray();
                Int32 totalRows = testDbs.FirstOrDefault()?.FullCount ?? 0;
                Test[] tests = testDbs.ToTests();

                return new PagedResult<Test>(tests, totalRows);
            }
        }

        public void RemoveTest(Guid id, Guid userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"with " +
                    $"t as ( " +
                    $"update tests " +
                    $"set isremoved = true " +
                    $"where id = @Id " +
                    $"AND  userid = @UserId " +
                    $"returning id " +
                    $"), " +
                    $"ti as( " +
                    $"update testitems " +
                    $"set isremoved = true " +
                    $"from t " +
                    $"where testid = t.id " +
                    $"returning testitems.id " +
                    $") " +
                    $"update testitemansweroptions " +
                    $"set isremoved = true " +
                    $"from ti " +
                    $"where ti.id = testitemansweroptions.testitemid ";
                var parameters = new
                {
                   Id = id,
                   UserId =userId
                };

                db.Execute(query, parameters);
            }
        }

        public TestItem[] GetTestItems(Guid testId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                using (var transaction = db.BeginTransaction())
                {
                    String selectTestItemsQuery = $"SELECT * " +
                    $"FROM testitems " +
                    $"WHERE testid = @TestId " +
                    $"  AND NOT isremoved;";

                    var selectTestItemsParameters = new
                    {
                        TestId = testId
                    };

                    String selectAnswerOptionsQuery = $"SELECT * " +
                    $"FROM testitemansweroptions " +
                    $"WHERE testitemid = ANY(@TestItemId) " +
                    $"  AND NOT isremoved;";

                    TestItemDb[] testItemDbs = db.Query<TestItemDb>(selectTestItemsQuery, selectTestItemsParameters, transaction: transaction).ToArray();
                    Guid[] testItemsDbIds = testItemDbs.Select(db => db.Id).ToArray();

                    var selectAnswerOptionsParameters = new
                    {
                        TestItemId = testItemsDbIds
                    };

                    AnswerOptionDb[] answerOptionDbs = db.Query<AnswerOptionDb>(selectAnswerOptionsQuery, selectAnswerOptionsParameters, transaction: transaction).ToArray();

                    return testItemDbs.ToTestItems(answerOptionDbs);
                }
            }
        }
    }
}
