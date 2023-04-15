using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using DoItTest.Services.Students.Repositories;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Services.Students
{
    public class StudentsService: IStudentsService
	{
		private readonly StudentsRepository _studentsRepository;

		public StudentsService(String connectionString)
		{
			_studentsRepository = new StudentsRepository(connectionString);
		}

		public Result SaveStudent(StudentBlank studentBlank, Guid? userId)
		{
			if (String.IsNullOrEmpty(studentBlank.FirstName))
				return Result.Fail("Укажите имя");

			if (String.IsNullOrEmpty(studentBlank.LastName))
				return Result.Fail("Укажите фамилию");

			if (String.IsNullOrEmpty(studentBlank.Group))
				return Result.Fail("Укажите группу");

			if (studentBlank.Id is null) studentBlank.Id = Guid.NewGuid();
			_studentsRepository.SaveStudent(studentBlank, userId);
			return Result.Success();
		}
	}
}
