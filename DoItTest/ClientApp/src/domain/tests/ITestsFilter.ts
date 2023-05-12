export interface ITestsFilter {

    page: number,
    pageSize: number,
    title: string | null
}

export function makeTestsFilter(filter: Partial<ITestsFilter>): ITestsFilter {
    const title = null

    return { title, page: 1, pageSize: 10, ...filter };
}

export default ITestsFilter