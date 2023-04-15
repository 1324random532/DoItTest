using Dapper;
using DoItTest.Domain.Students;
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
                String query = $"";

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
    }
}
