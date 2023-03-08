using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class CheckboxesAnswerOption: AnswerOption
    {
        public String Title { get; }
        public Boolean IsTrue { get; }

        public CheckboxesAnswerOption(Guid id, Guid testItemId, TestItemType type, String title, Boolean isTrue) : base(id, testItemId, type)
        {
            Title = title;
            IsTrue = isTrue;
        }
    }
}
