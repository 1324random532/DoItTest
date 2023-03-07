import { AnserOptionBlank } from "./anserOptionBlank";
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
        public answerOption: AnserOptionBlank | null,
        public key: string,
        public isCreated: boolean
    ) { }

    public static getDefault(): TestItemBlank {
        return new TestItemBlank(null, null, null, null, [], null, crypto.randomUUID(), false)
    }

    public static formTestItem(testItem: TestItem): TestItemBlank {
        if (testItem instanceof CheckboxesItem) {
            const answerOptions = AnserOptionBlank.formAnserOptions(testItem.answerOptions)

            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, answerOptions, null, crypto.randomUUID(), true
            );
        }
        if (testItem instanceof RadioButtonItem) {
            const answerOptions = AnserOptionBlank.formAnserOptions(testItem.answerOptions)

            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, answerOptions, null, crypto.randomUUID(), true
            );
        }
        if (testItem instanceof TextFieldItem) {
            const answerOption = AnserOptionBlank.formAnserOption(testItem.answerOption)

            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, [], answerOption, crypto.randomUUID(), true
            );
        }
        if (testItem instanceof NumericFieldItem) {
            const answerOption = AnserOptionBlank.formAnserOption(testItem.answerOption)

            return new TestItemBlank(
                testItem.id, testItem.testId, testItem.type,
                testItem.question, [], answerOption, crypto.randomUUID(), true
            );
        }

        throw "Некоректный тип testItem"
    }

    public static formTestItems(testItems: TestItem[]) {
        return testItems.map(this.formTestItem)
    }
}


