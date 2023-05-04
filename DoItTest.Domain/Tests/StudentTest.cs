namespace DoItTest.Domain.Tests
{
    public class StudentTest
    {
        public Guid Id { get; }
        public Guid TestId { get; }
        public Guid StudentId { get; }
        public StudentTestStatus Status { get; private set; }
        public Int32 PercentageOfCorrectAnswers { get; private set; }
        public Int32 Estimation { get; private set; }
        public DateTime BeginDateTime { get; }
        public DateTime? EndDateTime { get; private set; }

        public StudentTest(Guid id, Guid testId, Guid studentId, StudentTestStatus status, Int32 percentageOfCorrectAnswers, Int32 estimation, DateTime beginDateTime, DateTime? endDateTime)
        {
            Id = id;
            TestId = testId;
            StudentId = studentId;
            Status = status;
            PercentageOfCorrectAnswers = percentageOfCorrectAnswers;
            Estimation = estimation;
            BeginDateTime = beginDateTime;
            EndDateTime = endDateTime;
        }

        public void Finish(Boolean isExpired)
        {
            if (isExpired) Status = StudentTestStatus.Expired;
            else Status = StudentTestStatus.Completed;
            EndDateTime = DateTime.UtcNow;
        }

        public void Prepare(Test test, Int32 correctAnswersCount, Int32 testItemsCount)
        {
            Int32 percentageOfCorrectAnswers = (correctAnswersCount * 100) / testItemsCount;
            Int32 estimation = GetEstimation(percentageOfCorrectAnswers, test);

            PercentageOfCorrectAnswers = percentageOfCorrectAnswers;
            Estimation = estimation;
        }

        public Int32 GetEstimation(Int32 percentageOfCorrectAnswers, Test test)
        {
            if (percentageOfCorrectAnswers >= test.NumberOfPercentagesByFive) return 5;
            if (percentageOfCorrectAnswers >= test.NumberOfPercentagesByFive) return 4;
            if (percentageOfCorrectAnswers >= test.NumberOfPercentagesByThree) return 3;
            return 2;
        }
    }
}
