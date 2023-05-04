import { TestItemType } from "../testItemType"
import { AnswerOption } from "./answerOption"

export class CheckboxesAnswerOption extends AnswerOption {
    constructor(
        public id: string,
        public testItemId: string,
        public type: TestItemType,
        public title: string,
        public isTrue: boolean | null
    ) {
        super(id, testItemId, type)
    }
}

export function mapCheckboxesAnswerOption(value: any): CheckboxesAnswerOption {
    return new CheckboxesAnswerOption(value.id, value.testItemId, value.type, value.title, value.isTrue)
}

export function mapCheckboxesAnswerOptions(value: any[]): CheckboxesAnswerOption[] {
    return value.map(mapCheckboxesAnswerOption)
}