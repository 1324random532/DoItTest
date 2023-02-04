using DoItTest.Domain.Users;
using DoItTest.Tools.Types.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoItTest.Domain.Services
{
    public interface IUsersService
    {
        Result SaveUser(UserBlank userBlank, Guid? userId);
        User? GetUser(Guid id);
        Result RemoveUser(Guid id);
    }
}
