export interface IStudentTestFilter {

    page: number,
    pageSize: number,
    testId: string | null,
    studentFIO: string | null,
    group: string | null
}

export function makeStudentTestFilter(filter: Partial<IStudentTestFilter>): IStudentTestFilter {
    const testId = null
    const studentFIO = null
    const group = null

    return { testId, studentFIO, group, page: 1, pageSize: 10, ...filter };
}

export default IStudentTestFilter