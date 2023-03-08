import { TestItemType } from "../testItemType"
import { AnswerOption as AnswerOption } from "./answerOption"

export class TextFildAnswerOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public type: TestItemType,
        public answer: string
    ) {
        super(id, testItemId, type)
    }
}

export function mapTextFildAnswerOption(value: any): TextFildAnswerOption {
    return new TextFildAnswerOption(value.id, value.testItemId, value.type, value.answer)
}