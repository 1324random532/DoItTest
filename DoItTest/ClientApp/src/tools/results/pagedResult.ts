export class PagedResult<T>{
    constructor(
        public values: T[],
        public totalRows: number
    ) { }

    static convert<T>(data: any, func: (any: any) => T) {
        return new PagedResult<T>(
            (data.values as any[]).map(x => func(x)),
            data.totalRows
        )
    }
}
