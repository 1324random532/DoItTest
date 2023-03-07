import { mapRadioButtonAnserOptions, RadioButtonAnserOption } from "./anserOption/radioButtonAnserOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class RadioButtonItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOptions: RadioButtonAnserOption[],
    ) {
        super(id, testId, type, question)
    }
}

export function mapToRadioButtonItem(value: any): RadioButtonItem {
    const answerOptions = mapRadioButtonAnserOptions(value.answerOptions)

    return new RadioButtonItem(value.id, value.testId, value.type, value.question, answerOptions)
}