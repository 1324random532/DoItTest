import { DateTimePeriod } from "tools/dateTimePeriod";

export interface IStudentTestFilter {

    page: number,
    pageSize: number,
    testId: string | null,
    studentFIO: string | null,
    group: string | null,
    dateTimePeriod: DateTimePeriod
}

export function makeStudentTestFilter(filter: Partial<IStudentTestFilter>): IStudentTestFilter {
    const testId = null
    const studentFIO = null
    const group = null
    const dateTimePeriod = new DateTimePeriod(null, null)

    return { testId, studentFIO, group, dateTimePeriod, page: 1, pageSize: 10, ...filter };
}

export default IStudentTestFilter