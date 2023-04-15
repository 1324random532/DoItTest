using DoItTest.Domain.Students;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Domain.Services
{
    public interface IStudentsService
    {
        Result SaveStudent(StudentBlank studentBlank, Guid? userId);
    }
}
