namespace DoItTest.Domain.Students
{
    public class Student
    {
        public Guid Id { get; }
        public String FirstName { get; }
        public String LastName { get; }
        public String? Patronymic { get; }
        public String Group { get; }

        public Student(Guid id, String firstName, String lastName, String? patronymic, String group)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Patronymic = patronymic;
            Group = group;
        }
    }
}
