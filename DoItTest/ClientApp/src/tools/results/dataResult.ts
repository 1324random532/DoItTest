import { ResultError, mapToResultErrors } from "./resultError"

export interface DataResult<T> {
    isSuccess: boolean,
    errors: ResultError[],
    data: T
}

export namespace DataResult {
    export function get<T>(result: any, dataConverter: (data: any) => T): DataResult<T> {
        return { isSuccess: result.isSuccess, errors: mapToResultErrors(result.errors), data: dataConverter(result.data) }
    }
}

export const mapToDataResult = (data: any): DataResult<any> => {
    return { isSuccess: data.isSuccess, errors: mapToResultErrors(data.errors), data: data.data }
}