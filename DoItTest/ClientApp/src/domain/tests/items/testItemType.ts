export enum TestItemType {
    TextField = 1,
    NumericField = 2,
    RadioButtonsGroup = 3,
    CheckboxesGroup = 4,
    // Pictures = 5,
    Comparison = 6
}

export namespace TestItemType {
    export function getDisplayName(type: TestItemType): string {
        switch (type) {
            case TestItemType.TextField:
                return "Текст";
            case TestItemType.NumericField:
                return "Число";
            case TestItemType.RadioButtonsGroup:
                return "Выбрать один вариант из списка";
            case TestItemType.CheckboxesGroup:
                return "Выбрать несколько вариантов из списка";
            // case TestItemType.Pictures:
            //     return "Картинка";
            case TestItemType.Comparison:
                return "Сопоставление";
            default:
                throw "Не существующее занчение enum"
        }
    }
}