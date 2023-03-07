import { AnserOption } from "./anserOption"

export class RadioButtonAnserOption extends AnserOption {
    constructor(
        public id: string,
        public testItemId: string,
        public title: string,
        public isTrue: boolean
    ) {
        super(id, testItemId)
    }
}

export function mapRadioButtonAnserOption(value: any): RadioButtonAnserOption {
    return new RadioButtonAnserOption(value.id, value.testItemId, value.title, value.isTrue)
}

export function mapRadioButtonAnserOptions(value: any[]): RadioButtonAnserOption[] {
    return value.map(mapRadioButtonAnserOption)
}