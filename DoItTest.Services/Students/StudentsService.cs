using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using DoItTest.Services.Students.Repositories;
using DoItTest.Tools.Types.Results;

namespace DoItTest.Services.Students
{
    public class StudentsService: IStudentsService
	{
		private readonly StudentsRepository _studentsRepository;

		public StudentsService(StudentsRepository studentsRepository)
		{
			_studentsRepository = studentsRepository;
		}

		public DataResult<Guid> SaveStudent(StudentBlank studentBlank, Guid? userId)
		{
			if (String.IsNullOrEmpty(studentBlank.FirstName))
				return DataResult<Guid>.Failed("Укажите имя");

			if (String.IsNullOrEmpty(studentBlank.LastName))
				return DataResult<Guid>.Failed("Укажите фамилию");

			if (String.IsNullOrEmpty(studentBlank.Group))
				return DataResult<Guid>.Failed("Укажите группу");

			if (studentBlank.Id is null) studentBlank.Id = Guid.NewGuid();
			_studentsRepository.SaveStudent(studentBlank, userId);
			return DataResult<Guid>.Success(studentBlank.Id!.Value);
		}

		public Student? GetStudent(Guid id)
        {
			return _studentsRepository.GetStudent(id);
        }

		public Student[] GetStudents(Guid[] ids)
		{
			return _studentsRepository.GetStudents(ids);
		}
	}
}
