import { mapTextFildAnserOption, TextFildAnserOption } from "./anserOption/textFildAnserOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class TextFieldItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOption: TextFildAnserOption
    ) {
        super(id, testId, type, question)
    }
}

export function mapToTextFieldItem(value: any): TextFieldItem {
    const answerOption = mapTextFildAnserOption(value.answerOption)

    return new TextFieldItem(value.id, value.testId, value.type, value.question, answerOption)
}