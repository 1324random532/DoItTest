import { mapNumericAnswerOption, NumericAnswerOption } from "./answerOption/numericAnswerOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class NumericFieldItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public imageBase64: string | null,
        public answerOption: NumericAnswerOption
    ) {
        super(id, testId, type, question, imageBase64)
    }
}

export function mapToNumericFieldItem(value: any): NumericFieldItem {
    const answerOption = mapNumericAnswerOption(value.answerOption)

    return new NumericFieldItem(value.id, value.testId, value.type, value.question, value.imageBase64, answerOption)
}