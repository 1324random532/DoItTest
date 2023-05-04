import { StudentTestStatus } from "./studentTestStatus";

export class StudentTest {
    public constructor(
        public readonly id: string,
        public readonly testId: string,
        public readonly studentId: string,
        public readonly status: StudentTestStatus,
        public readonly beginDateTime: Date,
        public readonly endDateTime: Date | null,
        public readonly complitedTestItemsCount: number
    ) { }
}

export function mapToStudentTest(value: any): StudentTest {
    return new StudentTest(value.id, value.testId, value.studentId, value.status, value.beginDateTime, value.endDateTime, value.complitedTestItemsCount)
}

export function mapToStudentTests(value: any[]): StudentTest[] {
    return value.map(mapToStudentTest);
}