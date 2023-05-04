using DoItTest.Domain.Students;
using DoItTest.Services.Students.Models;

namespace DoItTest.Services.Students.Repositories.Converters
{
    internal static class StudetntsConverter
    {

        public static Student ToStudent(this StudentDb db)
        {
            return new Student(db.Id, db.FirstName, db.LastName, db.Patronymic, db.Group);
        }
    }
}
