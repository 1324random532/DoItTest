namespace DoItTest.Services.Students.Models
{
    public class StudentDb
    {
        public Guid Id { get; set; }
        public String FirstName { get; set; } = null!;
        public String LastName { get; set; } = null!;
        public String? Patronymic { get; set; }

        public DateTime CreatedDateTime { get; set; }
        public Guid? ModifiedUserId { get; set; }
        public DateTime? ModifiedDateTime { get; set; }
        public Boolean IsRemoved { get; set; }
    }
}
