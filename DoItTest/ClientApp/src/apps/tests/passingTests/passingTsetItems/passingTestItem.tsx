import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { TestItem } from "domain/tests/items/testItem";
import { TestItemType } from "domain/tests/items/testItemType";
import { PassingTextFieldItem } from "./passingTextFieldItem";
import { PassingNumberFieldItem } from "./passingNumberFieldItem";
import { PassingRadioButtonsItem } from "./passingRadioButtonsItem";
import { PassingCheckBoxesItem } from "./passingCheckBoxesItem";
import { TextFieldItem } from "domain/tests/items/textFieldItem";
import { NumberFieldItem } from "domain/tests/items/numberFieldItem";
import { RadioButtonItem } from "domain/tests/items/radioButtonItem";
import { CheckboxesItem } from "domain/tests/items/checkboxesItem";
import { AnswerBlank } from "domain/answers/answerBlank";
import { SetState } from "tools/setState";


export interface PassingTestItemProps {
    item: TestItem;
    answer: AnswerBlank;
    changeAnswer: SetState<AnswerBlank>;
    sx?: SxProps<Theme>;
}


export function PassingTestItem({ item, answer, changeAnswer, sx }: PassingTestItemProps): JSX.Element | null {

    if (item instanceof TextFieldItem) {
        return <PassingTextFieldItem item={item} answer={answer} changeAnswer={changeAnswer} sx={sx} />;
    }
    if (item instanceof NumberFieldItem) {
        return <PassingNumberFieldItem item={item} answer={answer} changeAnswer={changeAnswer} sx={sx} />;
    }
    if (item instanceof RadioButtonItem) {
        return <PassingRadioButtonsItem item={item} answer={answer} changeAnswer={changeAnswer} sx={sx} />;
    }
    if (item instanceof CheckboxesItem) {
        return <PassingCheckBoxesItem item={item} answer={answer} changeAnswer={changeAnswer} sx={sx} />;
    }
    return null
    // if (item instanceof TextFieldItem) {
    //     return <ComparisonItemInfo item={item} sx={sx} />;
    // }
}
