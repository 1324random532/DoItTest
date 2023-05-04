using Dapper;
using DoItTest.Domain.Students;
using DoItTest.Services.Students.Models;
using DoItTest.Services.Students.Repositories.Converters;
using Npgsql;
using System.Data;

namespace DoItTest.Services.Students.Repositories
{
    public class StudentsRepository
    {
        public String ConnectionString { get; }

        public StudentsRepository(String connectionSettings)
        {
            ConnectionString = connectionSettings;
        }

        public void SaveStudent(StudentBlank studentBlank, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"INSERT INTO students(id, firstname, lastname, patronymic, \"group\", createddatetimeutc) " +
                    $"VALUES(@Id, @FirstName, @LastName, @Patronymic, @Group, @DateTime) " +
                    $"ON " +
                    $"CONFLICT(id) DO " +
                    $"UPDATE " +
                    $"SET id = @Id, firstname = @FirstName, lastname = @LastName, patronymic = @Patronymic, \"group\" = @Group, " +
                    $"modifieduserid = @Userid, modifieddatetimeutc = @Datetime;";

                var parameters = new
                {
                    Id = studentBlank.Id,
                    FirstName = studentBlank.FirstName,
                    LastName = studentBlank.LastName,
                    Patronymic = studentBlank.Patronymic,
                    Group = studentBlank.Group,
                    Userid = userId,
                    Datetime = DateTime.UtcNow
                };

                db.Execute(query, parameters);
            }
        }

        public Student? GetStudent(Guid id)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM students " +
                    $"WHERE id=@Id " +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    Id = id
                };

                return db.Query<StudentDb>(query, parameters).FirstOrDefault()?.ToStudent();
            }
        }
    }
}
