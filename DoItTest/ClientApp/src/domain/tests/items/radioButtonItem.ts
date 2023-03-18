import { mapRadioButtonAnswerOptions, RadioButtonAnswerOption } from "./answerOption/radioButtonAnswerOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class RadioButtonItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public imageBase64: string | null,
        public answerOptions: RadioButtonAnswerOption[],
    ) {
        super(id, testId, type, question, imageBase64)
    }
}

export function mapToRadioButtonItem(value: any): RadioButtonItem {
    const answerOptions = mapRadioButtonAnswerOptions(value.answerOptions)

    return new RadioButtonItem(value.id, value.testId, value.type, value.question, value.imageBase64, answerOptions)
}