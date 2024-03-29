﻿namespace DoItTest.Domain.Students
{
    public class StudentBlank
    {
        public Guid? Id { get; set; }
        public String? FirstName { get; set; }
        public String? LastName { get; set; }
        public String? Patronymic { get; set; }
        public String? Group { get; set; }

        public String FullName { get
            {
                String?[] fullName = new String?[] { LastName, FirstName, Patronymic };
                return String.Join(" ", fullName);
            } 
        }
    }
}
