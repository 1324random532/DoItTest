using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    public class NumberAnswerOption: AnswerOption
    {
        public Decimal? Answer { get; }

        public NumberAnswerOption(Guid id, Guid testItemId, TestItemType type, Decimal? answer) : base(id, testItemId, type)
        {
            Answer = answer;
        }
    }
}
