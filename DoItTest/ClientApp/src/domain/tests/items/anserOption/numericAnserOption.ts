import { AnserOption as AnswerOption } from "./anserOption"

export class NumericAnswerOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public answer: number
    ) {
        super(id, testItemId)
    }
}

export function mapNumericAnserOption(value: any): NumericAnswerOption {
    return new NumericAnswerOption(value.id, value.testItemId, value.answer)
}