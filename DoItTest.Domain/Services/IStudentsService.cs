using DoItTest.Domain.Students;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Domain.Services
{
    public interface IStudentsService
    {
        DataResult<Guid> SaveStudent(StudentBlank studentBlank, Guid? userId);
        Student? GetStudent(Guid id);
        Student[] GetStudents(Guid[] ids);
    }
}
