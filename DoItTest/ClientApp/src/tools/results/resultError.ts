
export class ResultError {

    constructor(
        public key: string | null,
        public message: string
    ) { }
}

export namespace ResultError {
    export const get = (message: string) => {
        return new ResultError(null, message)
    }
}

export const mapToResultError = (data: any): ResultError => {
    return new ResultError(data.key || null, data.message)
}

export const mapToResultErrors = (data: any[]): ResultError[] => {
    return data.map(error => mapToResultError(error))
}