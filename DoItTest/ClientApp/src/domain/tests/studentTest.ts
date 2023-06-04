import Time from "tools/time";
import { StudentTestStatus } from "./studentTestStatus";
import { Test } from "./test";
import { getLocalAsUtc, getUtcAsLocal } from "tools/localeDate";

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

    public get spentTime() {
        if (this.endDateTime == null) return null;

        const spentTimeInSeconds = (this.endDateTime.getTime() - this.beginDateTime.getTime()) / 1000
        return new Time(spentTimeInSeconds)
    }
}

export function mapToStudentTest(value: any): StudentTest {

    const beginDateTime = getUtcAsLocal(new Date(value.beginDateTime))
    const endDateTime = value.endDateTime == null ? null : getUtcAsLocal(new Date(value.endDateTime))

    return new StudentTest(value.id, value.testId, value.studentId,
        value.percentageOfCorrectAnswers, value.estimation, beginDateTime, endDateTime)
}

export function mapToStudentTests(value: any[]): StudentTest[] {
    return value.map(mapToStudentTest);
}