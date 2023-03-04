import { AnserOptionBlank } from "./anserOptionBlank";
import { AnserOption } from "./items/anserOption";
import { CheckboxesItem } from "./items/checkboxesItem";
import { NumericFieldItem } from "./items/numericFieldItem";
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
        public answerOptions: AnserOptionBlank[],
        public stringAnswer: string | null,
        public numberAnswer: number | null,
        public answerKey: string | null,
        public answerKeys: string[],
        public key: string,
        public isCreated: boolean
    ) { }

    public static getDefault(): TestItemBlank {
        return new TestItemBlank(null, null, null, null, [], null, null, null, [], crypto.randomUUID(), false)
    }

    public static formTestItem(testItem: TestItem): TestItemBlank {
        if (testItem instanceof CheckboxesItem) {
            const answerOptions = AnserOptionBlank.formAnserOptions(testItem.answerOptions)

            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, answerOptions, null, null, null, testItem.answers, crypto.randomUUID(), true
            );
        }
        if (testItem instanceof RadioButtonItem) {
            const answerOptions = AnserOptionBlank.formAnserOptions(testItem.answerOptions)

            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, answerOptions, null, null, testItem.answer, [], crypto.randomUUID(), true
            );
        }
        if (testItem instanceof TextFieldItem) {
            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, [], testItem.answer, null, null, [], crypto.randomUUID(), true
            );
        }
        if (testItem instanceof NumericFieldItem) {
            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, [], null, testItem.answer, null, [], crypto.randomUUID(), true
            );
        }

        throw "Некоректный тип testItem"
    }

    public static formTestItems(testItems: TestItem[]) {
        return testItems.map(this.formTestItem)
    }
}


