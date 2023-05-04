import { TestItemType } from "../testItemType"
import { AnswerOption as AnswerOption } from "./answerOption"

export class NumericAnswerOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public type: TestItemType,
        public answer: number | null
    ) {
        super(id, testItemId, type)
    }
}

export function mapNumericAnswerOption(value: any): NumericAnswerOption {
    return new NumericAnswerOption(value.id, value.testItemId, value.type, value.answer)
}