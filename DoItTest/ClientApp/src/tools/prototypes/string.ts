export { }

declare global {
    interface StringConstructor {
        isNullOrEmpty(str: string | null | undefined): str is null | undefined
        isNullOrWhitespace(str: string | null | undefined): str is null | undefined
    }
}

String.isNullOrEmpty = function (str: string | null | undefined): str is null | undefined {
    return str === undefined || str === null || str.length == 0
}

String.isNullOrWhitespace = function (str: string | null | undefined): str is null | undefined {
    return String.isNullOrEmpty(str) || str.trim().length == 0
}