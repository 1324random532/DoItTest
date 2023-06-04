import { getLocalAsUtc, getUtcAsLocal } from "tools/localeDate"

export class StudentTestInfo {
    public constructor(
        public readonly beginDateTime: Date,
        public readonly passedTestItemtCount: number
    ) { }
}

export function mapToStudentTestInfo(value: any): StudentTestInfo {
    const beginDateTime = getUtcAsLocal(new Date(value.beginDateTime))
    return new StudentTestInfo(beginDateTime, value.passedTestItemtCount)
}