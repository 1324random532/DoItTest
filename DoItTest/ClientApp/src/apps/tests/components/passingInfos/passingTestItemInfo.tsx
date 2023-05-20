import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank"
import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material";
import { TestItem } from "domain/tests/items/testItem";
import { Answer } from "domain/answers/answer";
import { PassingTextFieldTestItemInfo } from "./passingTextFieldTestItemInfo";
import { TextFieldItem } from "domain/tests/items/textFieldItem";
import { NumberFieldItem } from "domain/tests/items/numberFieldItem";
import { PassingNumberFieldTestItemInfo } from "./passingNumberFieldTestItemInfo";
import { RadioButtonItem } from "domain/tests/items/radioButtonItem";
import { PassingRadioButtonsTestItemInfo } from "./passingRadioButtonsTestItemInfo";
import { PassingCheckBoxesTestItemInfo } from "./passingCheckBoxesTestItemInfo";
import { CheckboxesItem } from "domain/tests/items/checkboxesItem";
import { ComparisonItem } from "domain/tests/items/comparisonItem";
import { PassingComparisonTestItemInfo } from "./passingComparisonTestItemInfo";

export interface PassingTestItemInfoProps {
    item: TestItem
    answer: Answer | null
    sx?: SxProps<Theme>;
}


export function PassingTestItemInfo({ item, answer, sx }: PassingTestItemInfoProps): JSX.Element | null {
    if (item instanceof TextFieldItem) return <PassingTextFieldTestItemInfo item={item} answer={answer} />
    if (item instanceof NumberFieldItem) return <PassingNumberFieldTestItemInfo item={item} answer={answer} />
    if (item instanceof RadioButtonItem) return <PassingRadioButtonsTestItemInfo item={item} answer={answer} />
    if (item instanceof CheckboxesItem) return <PassingCheckBoxesTestItemInfo item={item} answer={answer} />
    if (item instanceof ComparisonItem) return <PassingComparisonTestItemInfo item={item} answer={answer} />
    return null;
}
