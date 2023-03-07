
import { AnserOption } from "./anserOption/anserOption";
import { CheckboxesAnserOption, mapCheckboxesAnserOptions } from "./anserOption/checkboxesAnserOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class CheckboxesItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOptions: CheckboxesAnserOption[],
    ) {
        super(id, testId, type, question)
    }
}

export function mapToCheckboxesItem(value: any): CheckboxesItem {
    const answerOptions = mapCheckboxesAnserOptions(value.answerOptions)

    return new CheckboxesItem(value.id, value.testId, value.type, value.question, answerOptions)
}