namespace DoItTest.Tools.Types.Results
{
    public readonly struct DataResult<T>
    {
        public T? Data { get; }
        public IEnumerable<Error> Errors { get; }
        public Boolean IsSuccess => !Errors.Any();

        private DataResult(T? data, IEnumerable<Error> errors)
        {
            Data = data;
            Errors = errors;
        }

        public static DataResult<T> Success(T data)
        {
            return new(data, new Error[0]);
        }

        public static DataResult<T> Failed(IEnumerable<Error> errors)
        {
            return new DataResult<T>(default, errors);
        }

        public static DataResult<T> Failed(String error)
        {
            return new DataResult<T>(default, new[] { new Error(error) });
        }
    }
}