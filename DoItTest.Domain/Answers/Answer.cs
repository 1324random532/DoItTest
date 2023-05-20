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
        public AnswerGroup[] AnswerGroups { get; private set; }
        public Boolean IsAnswered => !String.IsNullOrWhiteSpace(StringAnswer) || NumberAnswer is not null || AnswerOptionId is not null || AnswerOptionIds.Length != 0 || AnswerGroups.Length != 0;
        public Boolean IsTrue { get; private set; }

        public Answer(Guid id, Guid studentTestId, Guid testItemId, String? stringAnswer, Decimal? numberAnswer, Guid? answerOptionId, Guid[] answerOptionIds, AnswerGroup[] answerGroups, Boolean isTrue)
        {
            Id = id;
            StudentTestId = studentTestId;
            TestItemId = testItemId;
            StringAnswer = stringAnswer;
            NumberAnswer = numberAnswer;
            AnswerOptionId = answerOptionId;
            AnswerOptionIds = answerOptionIds;
            AnswerGroups = answerGroups;
            IsTrue = isTrue;
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

        public void SetAnswer(AnswerGroup[] answerGroups)
        {
            AnswerGroups = answerGroups;
        }

        public void SetIstrue(Boolean isTrue)
        {
            IsTrue = isTrue;
        }
    }
}
