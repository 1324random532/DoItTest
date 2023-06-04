export const getUtcAsLocal = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export const getLocalAsUtc = (date: Date) => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}
