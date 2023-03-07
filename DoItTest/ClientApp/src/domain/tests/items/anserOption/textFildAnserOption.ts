import { AnserOption as AnswerOption } from "./anserOption"

export class TextFildAnserOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public answer: string
    ) {
        super(id, testItemId)
    }
}

export function mapTextFildAnserOption(value: any): TextFildAnserOption {
    return new TextFildAnserOption(value.id, value.testItemId, value.answer)
}