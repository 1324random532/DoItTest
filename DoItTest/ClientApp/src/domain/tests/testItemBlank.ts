import { AnswerOptionBlank } from "./answerOptionBlank";
import { AnswerOptionGroupBlank } from "./items/answerOption/answerOptionGroups/answerOptionGroupBlank";
import { CheckboxesItem } from "./items/checkboxesItem";
import { ComparisonItem } from "./items/comparisonItem";
import { NumberFieldItem } from "./items/numberFieldItem";
import { RadioButtonItem } from "./items/radioButtonItem";
import { TestItem } from "./items/testItem";
import { TestItemType } from "./items/testItemType";
import { TextFieldItem } from "./items/textFieldItem";

export class TestItemBlank {
    public constructor(
        public id: string | null,
        public testId: string | null,
        public type: TestItemType | null,
        public question: string | null,
        public imageBase64: string | null,
        public answerOptions: AnswerOptionBlank[],
        public answerOption: AnswerOptionBlank | null,
        public answerOptionGroups: AnswerOptionGroupBlank[],
        public key: string,
        public isCreated: boolean
    ) { }

    public static getDefault(): TestItemBlank {
        return new TestItemBlank(null, null, null, null, null, [], null, [], crypto.randomUUID(), false)
    }

    public static formTestItem(testItem: TestItem, withoutId: boolean = false): TestItemBlank {
        let id: string | null = testItem.id
        if (withoutId) id = null;

        if (testItem instanceof CheckboxesItem) {
            const answerOptions = AnswerOptionBlank.formAnswerOptions(testItem.answerOptions, withoutId)

            return new TestItemBlank(
                id, testItem.testId, testItem.type,
                testItem.question, testItem.imageBase64, answerOptions, null, [], crypto.randomUUID(), true
            );
        }
        if (testItem instanceof RadioButtonItem) {
            const answerOptions = AnswerOptionBlank.formAnswerOptions(testItem.answerOptions, withoutId)

            return new TestItemBlank(
                id, testItem.testId, testItem.type,
                testItem.question, testItem.imageBase64, answerOptions, null, [], crypto.randomUUID(), true
            );
        }
        if (testItem instanceof TextFieldItem) {
            const answerOption = AnswerOptionBlank.formAnswerOption(testItem.answerOption, withoutId)

            return new TestItemBlank(
                id, testItem.testId, testItem.type,
                testItem.question, testItem.imageBase64, [], answerOption, [], crypto.randomUUID(), true
            );
        }
        if (testItem instanceof NumberFieldItem) {
            const answerOption = AnswerOptionBlank.formAnswerOption(testItem.answerOption, withoutId)

            return new TestItemBlank(
                id, testItem.testId, testItem.type,
                testItem.question, testItem.imageBase64, [], answerOption, [], crypto.randomUUID(), true
            );
        }
        if (testItem instanceof ComparisonItem) {
            const answerOptionGroups = AnswerOptionGroupBlank.formAnswerOptionGroups(testItem.answerOptionGroups, withoutId)

            return new TestItemBlank(
                id, testItem.testId, testItem.type,
                testItem.question, testItem.imageBase64, [], null, answerOptionGroups, crypto.randomUUID(), true
            );
        }

        throw "Некоректный тип testItem"
    }

    public static formTestItems(testItems: TestItem[], withoutId: boolean = false) {
        return testItems.map(i => this.formTestItem(i, withoutId))
    }
}


