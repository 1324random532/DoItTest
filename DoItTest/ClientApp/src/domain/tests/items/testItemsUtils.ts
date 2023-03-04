import { mapToCheckboxesItem } from "./checkboxesItem";
import { mapToNumericFieldItem } from "./numericFieldItem";
import { mapToPicturesItem } from "./picturesItem";
import { TestItem } from "./testItem";
import { TestItemType } from "./testItemType";
import { mapToTextFieldItem } from "./textFieldItem";

export const mapToTestItem = (data: any): TestItem => {
    switch (data.type) {
        case TestItemType.TextField:
            return mapToTextFieldItem(data);
        case TestItemType.NumericField:
            return mapToNumericFieldItem(data);
        case TestItemType.RadioButtonsGroup:
            return mapToCheckboxesItem(data);
        case TestItemType.Pictures:
            return mapToPicturesItem(data);
        default:
            throw new Error('unknown testItemType');
    }
}

export const mapToTestItems = (data: any[]) => {
    return data.map(u => mapToTestItem(u));
}