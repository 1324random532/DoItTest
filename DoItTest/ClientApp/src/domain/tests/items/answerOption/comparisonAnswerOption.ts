import { TestItemType } from "../testItemType"
import { AnswerOption } from "./answerOption"

export class ComparisonAnswerOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public type: TestItemType,
        public groupId: string | null,
        public title: string
    ) {
        super(id, testItemId, type)
    }
}

export function mapComparisonAnswerOption(value: any): ComparisonAnswerOption {
    return new ComparisonAnswerOption(value.id, value.testItemId, value.type, value.groupId, value.title)
}

export function mapComparisonAnswerOptions(value: any[]): ComparisonAnswerOption[] {
    return value.map(mapComparisonAnswerOption)
}