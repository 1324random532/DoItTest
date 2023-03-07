namespace DoItTest.Tools.Types.Results
{
    public class PagedResult<T>
    {
        public T[] Values { get; }
        public Int64 TotalRows { get; }

        public PagedResult(IEnumerable<T> values, Int64 totalRows)
        {
            Values = values.ToArray();
            TotalRows = totalRows;
        }
    }
}
