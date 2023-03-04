import { AnserOption } from "./anserOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class RadioButtonItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOptions: AnserOption[],
        public answer: string
    ) {
        super(id, testId, type, question)
    }
}

export function mapToRadioButtonItem(value: any): RadioButtonItem {
    return new RadioButtonItem(value.id, value.testId, value.type, value.question, value.answerOptions, value.answer)
}