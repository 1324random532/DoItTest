namespace DoItTest.Tools.Types
{
    public class DateTimePeriod
    {
        public DateTime? BeginDateTime { get; }
        public DateTime? EndDateTime { get; }

        public DateTimePeriod(DateTime? beginDateTime, DateTime? endDateTime)
        {
            BeginDateTime = beginDateTime;
            EndDateTime = endDateTime;
        }
    }
}
