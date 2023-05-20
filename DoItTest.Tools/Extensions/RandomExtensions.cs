namespace DoItTest.Tools.Extensions
{
    public static class RandomExtensions
    {
        private static Random _rnd =>  new Random();

        public static void Shuffle<T>(this T[] array)
        {
            int n = array.Length;
            while (n > 1)
            {
                int k = _rnd.Next(n--);
                T temp = array[n];
                array[n] = array[k];
                array[k] = temp;
            }
        }
    }
}
