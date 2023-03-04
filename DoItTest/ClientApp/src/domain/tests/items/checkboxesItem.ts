import { AnserOption } from "./anserOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class CheckboxesItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOptions: AnserOption[],
        public answers: string[]
    ) {
        super(id, testId, type, question)
    }
}

export function mapToCheckboxesItem(value: any): CheckboxesItem {
    return new CheckboxesItem(value.id, value.testId, value.type, value.question, value.answerOptions, value.answer)
}