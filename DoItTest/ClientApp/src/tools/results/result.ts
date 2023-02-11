import { mapToResultErrors, ResultError } from './resultError'


export class Result {

    public isSuccess = this.errors.length === 0

    constructor(
        public errors: ResultError[]
    ) { }

    static get(data: any): Result {
        return new Result(mapToResultErrors(data.errors))
    }
}