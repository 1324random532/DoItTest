import { TestItemType } from "../../testItemType"
import { AnswerOption } from "../answerOption"
import { mapToAnswerOptions } from "../answerOptionsUtils"
import { ComparisonAnswerOption, mapComparisonAnswerOptions } from "../comparisonAnswerOption"


export class AnswerOptionGroup extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public type: TestItemType,
        public name: string,
        public answerOptions: ComparisonAnswerOption[]
    ) {
        super(id, testItemId, type)
    }
}

export function mapAnswerOptionGroup(value: any): AnswerOptionGroup {
    const answerOptions = mapComparisonAnswerOptions(value.answerOptions)

    return new AnswerOptionGroup(value.id, value.testItemId, value.type, value.name, answerOptions)
}

export function mapAnswerOptionGroups(values: any[]): AnswerOptionGroup[] {
    return values.map(mapAnswerOptionGroup)
}