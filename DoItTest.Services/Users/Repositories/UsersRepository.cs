using Dapper;
using DoItTest.Domain.Users;
using DoItTest.Services.Users.Repositories.Converters;
using DoItTest.Services.Users.Repositories.Models;
using DoItTest.Tools.Types.Results;
using Npgsql;
using System.Data;

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
                String query = $"INSERT INTO users(id, login, passwordhash, role, createddatetimeutc) " +
                    $"VALUES(@Id,@Login,@PasswordHash,@Role,@DateTime) " +
                    $"ON " +
                    $"CONFLICT(id) DO " +
                    $"UPDATE " +
                    $"SET id = @Id, login = @Login, passwordhash = @PasswordHash, role = @Role," +
                    $"modifieduserid = @Userid, modifieddatetimeutc = @Datetime;";

                var parameters = new
                {
                    Id = userBlank.Id,
                    Login = userBlank.Login,
                    PasswordHash = userBlank.PasswordHash,
                    Role = userBlank.Role,
                    Userid = userId,
                    Datetime = DateTime.UtcNow
                };

                db.Execute(query, parameters);
            }
        }

        public User? GetUser(Guid id)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM users " +
                    $"WHERE id=@Id " +
                    $"  AND NOT isremoved;";

                var parameters = new
                {
                    Id = id
                };

                return db.Query<UserDb>(query, parameters).FirstOrDefault()?.ToUser();
            }
        }

        public User? GetUser(String login, String passwordHash)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM users " +
                    $"WHERE login=@Login " +
                    $"  AND passwordHash=@PasswordHash " +
                    $"  AND NOT isremoved ";

                var parameters = new
                {
                    Login = login,
                    PasswordHash= passwordHash,
                };

                return db.Query<UserDb>(query, parameters).FirstOrDefault()?.ToUser();
            }
        }

        public User? GetUser(String login)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT * " +
                    $"FROM users " +
                    $"WHERE login=@Login " +
                    $"  AND NOT isremoved";

                var parameters = new
                {
                    Login = login,
                };

                return db.Query<UserDb>(query, parameters).FirstOrDefault()?.ToUser();
            }
        }

        public PagedResult<User> GetPagedUsers(Int32 page, Int32 count)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT *,COUNT(*) OVER() AS FullCount " +
                    $"FROM users " +
                    $"WHERE NOT isremoved " +
                    $"  OFFSET @Offset " +
                    $"  LIMIT @Limit ";

                var parameters = new
                {
                    Offset = Math.Max((page - 1) * count, 0),
                    Limit = Math.Max(count, 0)
                };

                UserDb[] userDbs = db.Query<UserDb > (query, parameters).ToArray();
                Int32 totalRows = userDbs.FirstOrDefault()?.FullCount ?? 0;
                User[] users = userDbs.ToUsers();

                return new PagedResult<User>(users, totalRows);
            }
        }

        public void RemoveUser(Guid id)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"UPDATE users " +
                    $"SET isremoved = TRUE " +
                    $"WHERE id = @Id " +
                    $"AND NOT isremoved;";

                var parameters = new
                {
                    Id = id,
                };

                db.Execute(query, parameters);
            }
        }



        public void SaveUserToken(UserToken token)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"INSERT INTO usertokens (token, userid, expirationdatetimeutc) " +
                    $"VALUES (@Token, @UserId, @ExpirationDateTimeUtc);";

                var parameters = new
                {
                    Token = token.Value,
                    UserId = token.UserId,
                    ExpirationDateTimeUtc = token.ExpirationDateTimeUtc
                };

                db.Execute(query, parameters);
            }
        }

        public UserToken? GetUserToken(String token)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"SELECT *" +
                    $"FROM usertokens " +
                    $"WHERE token = @Token;";

                var parameters = new
                {
                    Token = token
                };

                return db.Query<UserTokenDb>(query, parameters).FirstOrDefault()?.ToUserToken();
            }
        }

        public void DeleteUserToken(String token)
        {
            using (IDbConnection db = new NpgsqlConnection(ConnectionString))
            {
                db.Open();
                String query = $"DELETE " +
                    $"FROM usertokens " +
                    $"WHERE token = @Token;";

                var parameters = new
                {
                    Token = token
                };

                db.Execute(query, parameters);
            }
        }
    }
}
