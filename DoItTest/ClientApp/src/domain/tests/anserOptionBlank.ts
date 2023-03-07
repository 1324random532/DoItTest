import { AnserOption } from "./items/anserOption/anserOption";
import { CheckboxesAnserOption } from "./items/anserOption/checkboxesAnserOption";
import { NumericAnswerOption } from "./items/anserOption/numericAnserOption";
import { RadioButtonAnserOption } from "./items/anserOption/radioButtonAnserOption";
import { TextFildAnserOption } from "./items/anserOption/textFildAnserOption";

export class AnserOptionBlank {
    public constructor(
        public id: string | null,
        public testItemId: string | null,
        public stringAnswer: string | null,
        public numberAnswer: number | null,
        public title: string | null,
        public isTrue: boolean | null,
        public key: string
    ) { }

    public static getDefault(isTrue?: boolean): AnserOptionBlank {
        return new AnserOptionBlank(null, null, null, null, null, isTrue ?? null, crypto.randomUUID())
    }

    public static formAnserOption(anserOption: AnserOption): AnserOptionBlank {
        const key = crypto.randomUUID()

        if (anserOption instanceof CheckboxesAnserOption) {
            return new AnserOptionBlank(anserOption.id, anserOption.testItemId, null, null, anserOption.title, anserOption.isTrue, key);
        }

        if (anserOption instanceof RadioButtonAnserOption) {
            return new AnserOptionBlank(anserOption.id, anserOption.testItemId, null, null, anserOption.title, anserOption.isTrue, key);
        }

        if (anserOption instanceof NumericAnswerOption) {
            return new AnserOptionBlank(anserOption.id, anserOption.testItemId, null, anserOption.answer, null, null, key);
        }

        if (anserOption instanceof TextFildAnserOption) {
            return new AnserOptionBlank(anserOption.id, anserOption.testItemId, anserOption.answer, null, null, null, key);
        }


        throw "Некоректный тип AnserOption"
    }

    public static formAnserOptions(anserOptions: AnserOption[]): AnserOptionBlank[] {
        return anserOptions.map(AnserOptionBlank.formAnserOption)
    }
}