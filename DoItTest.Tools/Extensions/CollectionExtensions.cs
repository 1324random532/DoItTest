namespace DoItTest.Tools.Extensions
{
    public static class CollectionExtensions
    {
        public static Boolean CompareArraysWithoutOrder<T>(this T[] firstArray, T[] twoArray)
        {
            return firstArray.OrderBy(i => i).SequenceEqual(twoArray.OrderBy(i => i));
        }
    }
}
