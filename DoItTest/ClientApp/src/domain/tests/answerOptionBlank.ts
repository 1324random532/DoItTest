import { AnswerOption } from "./items/answerOption/answerOption";
import { CheckboxesAnswerOption as CheckboxesAnswerOption } from "./items/answerOption/checkboxesAnswerOption";
import { ComparisonAnswerOption } from "./items/answerOption/comparisonAnswerOption";
import { NumericAnswerOption } from "./items/answerOption/numericAnswerOption";
import { RadioButtonAnswerOption as RadioButtonAnswerOption } from "./items/answerOption/radioButtonAnswerOption";
import { TextFildAnswerOption as TextFildAnswerOption } from "./items/answerOption/textFildAnswerOption";
import { TestItemType } from "./items/testItemType";
import { v4 as uuidv4 } from 'uuid';

export class AnswerOptionBlank {
    public constructor(
        public id: string | null,
        public testItemId: string | null,
        public type: TestItemType,
        public stringAnswer: string | null,
        public numberAnswer: number | null,
        public title: string | null,
        public isTrue: boolean | null,
        public groupId: string | null,
        public key: string
    ) { }

    public static getDefault(type: TestItemType, isTrue?: boolean): AnswerOptionBlank {
        return new AnswerOptionBlank(null, null, type, null, null, null, isTrue ?? null, null, uuidv4())
    }

    public static formAnswerOption(answerOption: AnswerOption, withoutId: boolean): AnswerOptionBlank {
        const key = uuidv4()

        let id: string | null = answerOption.id
        if (withoutId) id = null;

        if (answerOption instanceof CheckboxesAnswerOption) {
            return new AnswerOptionBlank(id, answerOption.testItemId, answerOption.type, null, null, answerOption.title, answerOption.isTrue, null, key);
        }

        if (answerOption instanceof RadioButtonAnswerOption) {
            return new AnswerOptionBlank(id, answerOption.testItemId, answerOption.type, null, null, answerOption.title, answerOption.isTrue, null, key);
        }

        if (answerOption instanceof NumericAnswerOption) {
            return new AnswerOptionBlank(id, answerOption.testItemId, answerOption.type, null, answerOption.answer, null, null, null, key);
        }

        if (answerOption instanceof TextFildAnswerOption) {
            return new AnswerOptionBlank(id, answerOption.testItemId, answerOption.type, answerOption.answer, null, null, null, null, key);
        }

        if (answerOption instanceof ComparisonAnswerOption) {
            return new AnswerOptionBlank(id, answerOption.testItemId, answerOption.type, null, null, answerOption.title, null, answerOption.groupId, key);
        }

        throw "Некоректный тип AnswerOption"
    }

    public static formAnswerOptions(answerOptions: AnswerOption[], withoutId: boolean): AnswerOptionBlank[] {
        return answerOptions.map(a => AnswerOptionBlank.formAnswerOption(a, withoutId))
    }
}