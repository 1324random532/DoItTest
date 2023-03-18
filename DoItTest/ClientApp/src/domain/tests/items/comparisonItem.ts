import { AnswerOption } from "./answerOption/answerOption"
import { AnswerOptionGroup, mapAnswerOptionGroups } from "./answerOption/answerOptionGroups/answerOptionGroup"
import { ComparisonAnswerOption, mapComparisonAnswerOptions } from "./answerOption/comparisonAnswerOption"
import { TestItem } from "./testItem"
import { TestItemType } from "./testItemType"

export class ComparisonItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public imageBase64: string | null,
        public answerOptionGroups: AnswerOptionGroup[],
    ) {
        super(id, testId, type, question, imageBase64)
    }
}

export function mapToComparisonItem(value: any): ComparisonItem {
    const answerOptions = mapAnswerOptionGroups(value.answerOptionGroups)

    return new ComparisonItem(value.id, value.testId, value.type, value.question, value.imageBase64, answerOptions)
}