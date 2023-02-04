using Dapper;
using System.Data;
using Npgsql;
using DoItTest.Domain.Users;
using DoItTest.Services.Users.Repositories.Models;
using DoItTest.Services.Users.Repositories.Converters;
using DoItTest.Tools.DB;

namespace DoItTest.Services.Users.Repositories
{
    public class UsersRepository
    {
        public String ConnectionString { get; }

        public UsersRepository(String connectionSettings)
        {
            ConnectionString = connectionSettings;
        }

        public void SaveUser(UserBlank userBlank, Guid? userId)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"INSERT INTO users(id, login, passwordhash, role, createduserid, createddatetime)" +
                    $"VALUES(@Id,@Login,@PasswordHash,@Role,@UserId,@DateTime)" +
                    $"ON" +
                    $"CONFLICT(id) DO" +
                    $"UPDATE" +
                    $"SET id = @Id, login = @Login, passwordhash = @PasswordHash, role = @Role," +
                    $"modifieduserid = @Userid, modifieddatetime = @Datetime;";

                SqlParameter[] parameters =
                {
                    new ("Id", userBlank.Id),
                    new ("Login", userBlank.Login),
                    new ("PasswordHash", userBlank.PasswordHash),
                    new ("Role", userBlank.Role),
                    new ("Userid", userId),
                    new ("Datetime", DateTime.Now)
                };

                db.Execute(query, parameters);
            }
        }

        public User? GetUser(Guid id)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT *" +
                    $"FROM users" +
                    $"WHERE Id=@Id" +
                    $"  AND NOT isremoved";

                SqlParameter[] parameters =
                {
                    new ("Id", id)
                };

                return db.Query<UserDb>(query, parameters).FirstOrDefault()?.ToUser();
            }
        }

        public User? GetUser(String login)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT *" +
                    $"FROM users" +
                    $"WHERE Login=@Login" +
                    $"  AND NOT isremoved";

                SqlParameter[] parameters =
                {
                    new ("Login", login)
                };

                return db.Query<UserDb>(query, parameters).FirstOrDefault()?.ToUser();
            }
        }

        public void RemoveUser(Guid id)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"UPDATE users" +
                    $"SET isremoved = TRUE" +
                    $"WHERE id = @Id" +
                    $"AND NOT isremoved;";

                SqlParameter[] parameters =
                {
                    new ("Id", id)
                };

                db.Execute(query, id);
            }
        }
    }
}
