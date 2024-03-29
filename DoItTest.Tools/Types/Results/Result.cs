﻿namespace DoItTest.Tools.Types.Results
{
    public class Result
    {
        public Error[] Errors { get; }
        public bool IsSuccess => Errors is null || Errors.Length == 0;

        private Result(IEnumerable<Error> errors)
        {
            Errors = errors?.ToArray() ?? new Error[0];
        }

        public static Result Success() => new(new Error[0]);

        public static Result Fail(string error) => new(new[] { new Error(error) });
        public static Result Fail(IEnumerable<Error> errors) => new(errors);
    }
}
