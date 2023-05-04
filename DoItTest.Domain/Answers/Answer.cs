namespace DoItTest.Domain.Answers
{
    public class Answer 
    {
        public Guid Id { get; }
        public Guid StudentTestId { get; }
        public Guid TestItemId { get; }
        public String? StringAnswer { get; private set; }
        public Decimal? NumberAnswer { get; private set; }
        public Guid? AnswerOptionId { get; private set; }
        public Guid[] AnswerOptionIds { get; private set; }

        public Answer(Guid id, Guid studentTestId, Guid testItemId, String? stringAnswer, Decimal? numberAnswer, Guid? answerOptionId, Guid[] answerOptionIds)
        {
            Id = id;
            StudentTestId = studentTestId;
            TestItemId = testItemId;
            StringAnswer = stringAnswer;
            NumberAnswer = numberAnswer;
            AnswerOptionId = answerOptionId;
            AnswerOptionIds = answerOptionIds;
        }

        public void SetAnswer(String answer)
        {
            StringAnswer = answer;
        }

        public void SetAnswer(Decimal answer)
        {
            NumberAnswer = answer;
        }

        public void SetAnswer(Guid answer)
        {
            AnswerOptionId = answer;
        }
        public void SetAnswer(Guid[] answer)
        {
            AnswerOptionIds = answer;
        }
    }
}
