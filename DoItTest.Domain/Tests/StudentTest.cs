namespace DoItTest.Domain.Tests
{
    public class StudentTest
    {
        public Guid Id { get; }
        public Guid TestId { get; }
        public Guid StudentId { get; }
        public Int32 PercentageOfCorrectAnswers { get; private set; }
        public Int32 Estimation { get; private set; }
        public DateTime BeginDateTime { get; }
        public DateTime? EndDateTime { get; private set; }
        public DateTime MaxEndDateTime { get; }
        public StudentTestStatus Status
        {
            get
            {
                if (EndDateTime is not null) return StudentTestStatus.Completed;
                if (DateTime.UtcNow > MaxEndDateTime) return StudentTestStatus.Expired;

                return StudentTestStatus.Passing;
            }
        }

        public StudentTest(Guid id, Guid testId, Guid studentId, Int32 percentageOfCorrectAnswers, Int32 estimation, DateTime beginDateTime, DateTime? endDateTime, DateTime maxEndDateTime)
        {
            Id = id;
            TestId = testId;
            StudentId = studentId;
            PercentageOfCorrectAnswers = percentageOfCorrectAnswers;
            Estimation = estimation;
            BeginDateTime = beginDateTime;
            EndDateTime = endDateTime;
            MaxEndDateTime = maxEndDateTime;
        }

        public void Finish()
        {
            EndDateTime = DateTime.UtcNow;
        }

        public void Prepare(Test test, Int32 correctAnswersCount, Int32 testItemsCount)
        {
            Int32 percentageOfCorrectAnswers = (correctAnswersCount * 100) / testItemsCount;
            PercentageOfCorrectAnswers = percentageOfCorrectAnswers;
            Estimation = GetEstimation(test);
        }

        public Int32 GetEstimation(Test test)
        {
            if (PercentageOfCorrectAnswers >= test.NumberOfPercentagesByFive) return 5;
            if (PercentageOfCorrectAnswers >= test.NumberOfPercentagesByFour) return 4;
            if (PercentageOfCorrectAnswers >= test.NumberOfPercentagesByThree) return 3;
            return 2;
        }
    }
}
