import { TestItemType } from "../testItemType"
import { AnswerOption } from "./answerOption"

export class RadioButtonAnswerOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public type: TestItemType,
        public title: string,
        public isTrue: boolean
    ) {
        super(id, testItemId, type)
    }
}

export function mapRadioButtonAnswerOption(value: any): RadioButtonAnswerOption {
    return new RadioButtonAnswerOption(value.id, value.testItemId, value.type, value.title, value.isTrue)
}

export function mapRadioButtonAnswerOptions(value: any[]): RadioButtonAnswerOption[] {
    return value.map(mapRadioButtonAnswerOption)
}