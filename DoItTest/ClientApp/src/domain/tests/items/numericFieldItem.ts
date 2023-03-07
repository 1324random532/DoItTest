import { mapNumericAnserOption, NumericAnswerOption } from "./anserOption/numericAnserOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class NumericFieldItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOption: NumericAnswerOption
    ) {
        super(id, testId, type, question)
    }
}

export function mapToNumericFieldItem(value: any): NumericFieldItem {
    const answerOption = mapNumericAnserOption(value.answerOption)

    return new NumericFieldItem(value.id, value.testId, value.type, value.question, answerOption)
}