import { mapRadioButtonAnswerOptions, RadioButtonAnswerOption } from "./answerOption/radioButtonAnswerOption";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";

export class RadioButtonItem extends TestItem {
    constructor(
        public id: string,
        public testId: string,
        public type: TestItemType,
        public question: string,
        public answerOptions: RadioButtonAnswerOption[],
    ) {
        super(id, testId, type, question)
    }
}

export function mapToRadioButtonItem(value: any): RadioButtonItem {
    const answerOptions = mapRadioButtonAnswerOptions(value.answerOptions)

    return new RadioButtonItem(value.id, value.testId, value.type, value.question, answerOptions)
}