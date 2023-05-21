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

                    String saveTestQuery = $"INSERT INTO tests (id, userid, title, timetocompleteinseconds, numberofpercentagesbyfive, numberofpercentagesbyfour, numberofpercentagesbythree) " +
                    $"VALUES(@Id,@UserId,@Title,@TimeToCompleteInSeconds,@NumberOfPercentagesByFive,@NumberOfPercentagesByFour,@NumberOfPercentagesByThree);";

                    var saveTestparameters = new
                    {
                        test.Id,
                        test.UserId,
                        test.Title,
                        test.TimeToCompleteInSeconds,
                        test.NumberOfPercentagesByFive,
                        test.NumberOfPercentagesByFour,
                        test.NumberOfPercentagesByThree
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

        public Test? GetTest(Guid id, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM tests " +
                    $"WHERE id=@Id " +
                    $"  AND (@UserId is null or userid = @UserId)" +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    Id = id,
                    UserId = userId
                };

                return db.Query<TestDb>(query, parameters).FirstOrDefault()?.ToTest();
            }
        }

        public Test[] GetTests(Guid[] ids, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM tests " +
                    $"WHERE id = ANY(@Ids) " +
                    $"  AND (@UserId is null or userid = @UserId) " +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    Ids = ids,
                    UserId = userId
                };

                return db.Query<TestDb>(query, parameters).ToTests();
            }
        }

        public Test[] GetTests(String? searchText, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM tests " +
                    $"WHERE (@UserId is null or userid = @UserId)" +
                    $"  AND (@SearchText is null or @SearchText = '' or title ilike '%' || @SearchText || '%') " +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    SearchText = searchText,
                    UserId = userId
                };

                return db.Query<TestDb>(query, parameters).ToTests();
            }
        }

        public PagedResult<Test> GetPagedTests(TestsFilter filter)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT *,COUNT(*) OVER() AS FullCount " +
                    $"FROM tests " +
                    $"WHERE (@UserId is null or userid = @UserId) " +
                    $"  AND NOT isremoved " +
                    $"  AND (@Title is null or @Title = '' or title ilike '%' || @Title || '%')" +
                    $"  OFFSET @Offset " +
                    $"  LIMIT @Limit ";

                var parameters = new
                {
                    UserId = filter.UserId,
                    Title = filter.Title,
                    Offset = Math.Max((filter.Page - 1) * filter.PageSize, 0),
                    Limit = Math.Max(filter.PageSize, 0)
                };

                TestDb[] testDbs = db.Query<TestDb>(query, parameters).ToArray();
                Int32 totalRows = testDbs.FirstOrDefault()?.FullCount ?? 0;
                Test[] tests = testDbs.ToTests();

                return new PagedResult<Test>(tests, totalRows);
            }
        }

        public void RemoveTest(Guid id, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"with " +
                    $"t as ( " +
                    $"update tests " +
                    $"set isremoved = true " +
                    $"where id = @Id " +
                    $"AND  (@UserId is null or userid = @UserId) " +
                    $"returning id " +
                    $"), " +
                    $"ti as( " +
                    $"update testitems " +
                    $"set isremoved = true " +
                    $"from t " +
                    $"where testid = t.id " +
                    $"returning testitems.id " +
                    $")," +
                    $"st as( " +
                    $"update studenttests " +
                    $"set isremoved = true " +
                    $"from t " +
                    $"where testid = t.id " +
                    $"returning studenttests.id " +
                    $")," +
                    $"a as(" +
                    $"update answers a " +
                    $"set isremoved = true " +
                    $"from st " +
                    $"where st.id = a.studenttestid " +
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

        public TestItem? GetTestItem(Guid id, Boolean getAnswers)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                using (var transaction = db.BeginTransaction())
                {
                    String selectTestItemsQuery = $"SELECT * " +
                    $"FROM testitems " +
                    $"WHERE id = @Id " +
                    $"  AND NOT isremoved;";

                    var selectTestItemsParameters = new
                    {
                        Id = id
                    };

                    String selectAnswerOptionsQuery = $"SELECT * " +
                    $"FROM testitemansweroptions " +
                    $"WHERE testitemid = @TestItemId " +
                    $"  AND NOT isremoved;";

                    TestItemDb? testItemDb = db.Query<TestItemDb>(selectTestItemsQuery, selectTestItemsParameters, transaction: transaction).FirstOrDefault();
                    if (testItemDb is null) return null;

                    var selectAnswerOptionsParameters = new
                    {
                        TestItemId = testItemDb.Id
                    };

                    AnswerOptionDb[] answerOptionDbs = db.Query<AnswerOptionDb>(selectAnswerOptionsQuery, selectAnswerOptionsParameters, transaction: transaction).ToArray();

                    return testItemDb.ToTestItem(answerOptionDbs, getAnswers);
                }
            }
        }

        public TestItem[] GetTestItems(Guid testId, Boolean getAnswers, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                using (var transaction = db.BeginTransaction())
                {
                    String selectTestItemsQuery = $"SELECT i.* " +
                    $"FROM testitems i join tests t on t.id = i.testid " +
                    $"WHERE testid = @TestId " +
                    $"  AND (@UserId IS NULL OR t.userid = @UserId) " +
                    $"  AND NOT i.isremoved;";

                    var selectTestItemsParameters = new
                    {
                        TestId = testId,
                        UserId = userId
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

                    return testItemDbs.ToTestItems(answerOptionDbs, getAnswers);
                }
            }
        }

        public TestItem[] GetTestItemsByStudentTestId(Guid studentTestId, Boolean getAnswers)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                using (var transaction = db.BeginTransaction())
                {
                    String selectTestItemsQuery = $"SELECT i.* " +
                    $"FROM testitems i JOIN tests t ON i.testid = t.id AND NOT t.isremoved " +
                    $"LEFT JOIN studenttests st ON st.testid = t.id AND NOT st.isremoved " +
                    $"WHERE st.id = @StudentTestId " +
                    $"  AND NOT i.isremoved;";

                    var selectTestItemsParameters = new
                    {
                        StudentTestId = studentTestId
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

                    return testItemDbs.ToTestItems(answerOptionDbs, getAnswers);
                }
            }
        }

        public void SaveStudentTest(StudentTest studentTest, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"INSERT INTO studenttests(id, testid, studentid, begindatetime, enddatetime, maxenddatetime, percentageofcorrectanswers, estimation) " +
                    $"VALUES(@Id,@Testid,@Studentid,@BeginDateTime,@EndDateTime, @MaxEndDateTime, @PercentageOfCorrectAnswers, @Estimation) " +
                    $"ON " +
                    $"CONFLICT(id) DO " +
                    $"UPDATE " +
                    $"SET id = @Id, testid = @Testid, studentid = @Studentid, begindatetime = @BeginDateTime," +
                    $"enddatetime = @EndDateTime, percentageofcorrectanswers = @PercentageOfCorrectAnswers, estimation = @Estimation, modifieduserid = @ModifiedUserId, modifieddatetime = @ModifiedDateTime;";

                var parameters = new
                {
                    Id = studentTest.Id,
                    Testid = studentTest.TestId,
                    Studentid = studentTest.StudentId,
                    BeginDateTime = studentTest.BeginDateTime,
                    EndDateTime = studentTest.EndDateTime,
                    PercentageOfCorrectAnswers = studentTest.PercentageOfCorrectAnswers,
                    Estimation = studentTest.Estimation,
                    MaxEndDateTime = studentTest.MaxEndDateTime,
                    ModifiedUserId = userId,
                    ModifiedDateTime= DateTime.UtcNow
                };

                db.Execute(query, parameters);
            }
        }

        public StudentTest? GetStudentTestById(Guid id, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT st.* " +
                    $"FROM studentTests st JOIN tests t ON t.id = st.testid AND NOT t.isremoved " +
                    $"JOIN users u ON u.id = t.userid AND NOT u.isremoved " +
                    $"WHERE st.id = @Id " +
                    $"  AND (@UserId IS NULL OR u.id = @UserId) " +
                    $"  AND NOT st.isremoved;";

                var parameters = new
                {
                    Id = id,
                    UserId = userId
                };

                return db.Query<StudentTestDb>(query, parameters).FirstOrDefault()?.ToStudentTest();
            }
        }

        public StudentTest? GetStudentTest(Guid studentId, Guid? testId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM studentTests " +
                    $"WHERE (@TestId is null or testid=@TestId) " +
                    $"  AND studentid=@StudentId" +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    TestId = testId,
                    StudentId = studentId
                };

                return db.Query<StudentTestDb>(query, parameters).FirstOrDefault()?.ToStudentTest();
            }
        }

        public StudentTest[] GetStudentTests(Guid testId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM studenttests " +
                    $"WHERE testid = @TestId " +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    TestId = testId
                };

                return db.Query<StudentTestDb>(query, parameters).ToArray().ToStudentTests();
            }
        }

        public PagedResult<StudentTest> GetPagedStudentTests(StudentTestFilter filter)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT st.*,COUNT(*) OVER() AS FullCount " +
                    $"FROM studenttests st JOIN tests t ON st.testid = t.id AND NOT t.isremoved " +
                    $"JOIN users u ON t.userid = u.id AND NOT u.isremoved " +
                    $"JOIN students s ON s.id = st.studentid AND NOT s.isremoved " +
                    $"WHERE NOT st.isremoved " +
                    $"  AND (@UserId IS NULL OR u.id = @UserId)" +
                    $"  AND (@TestId IS NULL OR st.testid = @TestId)" +
                    $"  AND (@Group IS NULL OR @Group = '' OR s.group ilike '%' || @Group || '%')" +
                    $"  AND (@StudentFIO IS NULL OR @StudentFIO = '' OR s.fullname ilike '%' || @StudentFIO || '%')" +
                    $"  OFFSET @Offset " +
                    $"  LIMIT @Limit ";

                var parameters = new
                {
                    TestId = filter.TestId,
                    UserId = filter.UserId,
                    Group = filter.Group,
                    StudentFIO = filter.studentFIO,
                    Offset = Math.Max((filter.Page - 1) * filter.PageSize, 0),
                    Limit = Math.Max(filter.PageSize, 0)
                };

                StudentTestDb[] studentTestDbs = db.Query<StudentTestDb>(query, parameters).ToArray();
                Int32 totalRows = studentTestDbs.FirstOrDefault()?.FullCount ?? 0;
                StudentTest[] studentTests = studentTestDbs.ToStudentTests();

                return new PagedResult<StudentTest>(studentTests, totalRows);
            }
        }

        public void RemoveStudentTest(Guid id, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();

                String query = $"with " +
                    $"st as ( " +
                    $"update studenttests st " +
                    $"set isremoved = true " +
                    $"from tests t  " +
                    $"where st.id = @Id " +
                    $"and st.testid = t.id " +
                    $"and (@UserId IS NULL OR t.userid = @UserId) " +
                    $"returning st.id, st.studentid " +
                    $"), " +
                    $"a as(" +
                    $"update answers a " +
                    $"set isremoved = true " +
                    $"from st " +
                    $"where st.id = a.studenttestid " +
                    $") " +
                    $"update students s " +
                    $"set isremoved = true " +
                    $"from st " +
                    $"where st.studentid = s.id";

                var parameters = new
                {
                    Id = id,
                    UserId = userId
                };

                db.Execute(query, parameters);
            }
        }
    }
}
