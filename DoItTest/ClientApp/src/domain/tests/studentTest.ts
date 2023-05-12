import { StudentTestStatus } from "./studentTestStatus";
import { Test } from "./test";

export class StudentTest {
    public constructor(
        public readonly id: string,
        public readonly testId: string,
        public readonly studentId: string,
        public readonly percentageOfCorrectAnswers: number,
        public readonly estimation: number,
        public readonly beginDateTime: Date,
        public readonly endDateTime: Date | null,
    ) { }
}

export function mapToStudentTest(value: any): StudentTest {
    const beginDateTime = new Date(value.beginDateTime)
    const endDateTime = value.endDateTime == null ? null : new Date(value.endDateTime)

    return new StudentTest(value.id, value.testId, value.studentId,
        value.percentageOfCorrectAnswers, value.estimation, beginDateTime, endDateTime)
}

export function mapToStudentTests(value: any[]): StudentTest[] {
    return value.map(mapToStudentTest);
}