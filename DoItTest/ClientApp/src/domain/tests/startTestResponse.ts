import { Student, mapToStudent } from "domain/students/student";
import { TestInfo } from "./testInfo";
import { TestItem } from "./items/testItem";
import { mapToTestItem } from "./items/testItemsUtils";

export class StartTestResponse {
    public constructor(
        public readonly student: Student,
        public readonly testItem: TestItem
    ) { }
}

export function mapToStartTestResponse(value: any): StartTestResponse {
    const student = mapToStudent(value.student)
    const testItem = mapToTestItem(value.testItem)

    return new StartTestResponse(student, testItem)
}