import { mapTextFildAnswerOption, TextFildAnswerOption } from "./answerOption/textFildAnswerOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class TextFieldItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public imageBase64: string | null,
        public answerOption: TextFildAnswerOption
    ) {
        super(id, testId, type, question, imageBase64)
    }
}

export function mapToTextFieldItem(value: any): TextFieldItem {
    const answerOption = mapTextFildAnswerOption(value.answerOption)

    return new TextFieldItem(value.id, value.testId, value.type, value.question, value.imageBase64, answerOption)
}