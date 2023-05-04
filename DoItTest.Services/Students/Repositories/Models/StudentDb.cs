namespace DoItTest.Services.Students.Models
{
    public class StudentDb
    {
        public Guid Id { get; set; }
        public String FirstName { get; set; } = null!;
        public String LastName { get; set; } = null!;
        public String? Patronymic { get; set; }
        public String Group { get; set; }

        public DateTime CreatedDateTimeUtc { get; set; }
        public Guid? ModifiedUserId { get; set; }
        public DateTime? ModifiedDateTimeUtc { get; set; }
        public Boolean IsRemoved { get; set; }
    }
}
