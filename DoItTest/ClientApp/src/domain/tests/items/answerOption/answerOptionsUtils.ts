import { TestItemType } from "../testItemType";
import { AnswerOption } from "./answerOption";
import { mapCheckboxesAnswerOption } from "./checkboxesAnswerOption";
import { mapComparisonAnswerOption } from "./comparisonAnswerOption";
import { mapNumericAnswerOption } from "./numericAnswerOption";
import { mapRadioButtonAnswerOption } from "./radioButtonAnswerOption";
import { mapTextFildAnswerOption } from "./textFildAnswerOption";


export const mapToAnswerOption = (data: any): AnswerOption => {
    switch (data.type) {
        case TestItemType.TextField:
            return mapTextFildAnswerOption(data);
        case TestItemType.NumericField:
            return mapNumericAnswerOption(data);
        case TestItemType.CheckboxesGroup:
            return mapCheckboxesAnswerOption(data);
        case TestItemType.RadioButtonsGroup:
            return mapRadioButtonAnswerOption(data);
        case TestItemType.Comparison:
            return mapComparisonAnswerOption(data);
        default:
            throw new Error('unknown testItemType');
    }
}

export const mapToAnswerOptions = (data: any[]) => {
    return data.map(u => mapToAnswerOption(u));
}