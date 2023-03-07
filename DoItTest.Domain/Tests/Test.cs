using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoItTest.Domain.Tests
{
    public class Test
    {
        public Guid Id { get; }
        public Guid UserId { get; }
        public String Title { get; }

        public Test(Guid id, Guid userId, String title)
        {
            Id = id;
            UserId = userId;
            Title = title;
        }
    }
}
