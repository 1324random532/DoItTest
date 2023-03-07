import { AnserOption } from "./anserOption"

export class CheckboxesAnserOption extends AnserOption {
    constructor(
        public id: string,
        public testItemId: string,
        public title: string,
        public isTrue: boolean
    ) {
        super(id, testItemId)
    }
}

export function mapCheckboxesAnserOption(value: any): CheckboxesAnserOption {
    return new CheckboxesAnserOption(value.id, value.testItemId, value.title, value.isTrue)
}

export function mapCheckboxesAnserOptions(value: any[]): CheckboxesAnserOption[] {
    return value.map(mapCheckboxesAnserOption)
}