namespace DoItTest.Tools.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime EndOfDay(this DateTime theDate)
        {
            return theDate.Date.AddDays(1).AddTicks(-1);
        }
    }
}
