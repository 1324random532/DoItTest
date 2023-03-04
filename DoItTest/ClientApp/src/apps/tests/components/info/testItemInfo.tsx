import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank"
import { TextFieldTestItemInfo } from "./textFieldTestItemInfo";
import { NumberFieldTestItemInfo } from "./numberFieldTestItemInfo";
import { RadioButtonsFieldTestItemInfo } from "./radioButtonsTestItemInfo";
import { CheckBoxesTestItemInfo } from "./checkBoxesTestItemInfo";
import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material";

export interface TestItemInfoProps {
    item: TestItemBlank
    sx?: SxProps<Theme>;
}


export function TestItemInfo({ item, sx }: TestItemInfoProps): JSX.Element | null {
    switch (item.type) {
        case TestItemType.TextField:
            return <TextFieldTestItemInfo item={item} sx={sx} />;
        case TestItemType.NumericField:
            return <NumberFieldTestItemInfo item={item} sx={sx} />;
        case TestItemType.RadioButtonsGroup:
            return <RadioButtonsFieldTestItemInfo item={item} sx={sx} />;
        case TestItemType.CheckboxesGroup:
            return <CheckBoxesTestItemInfo item={item} sx={sx} />;
        default:
            return null;
    }
}
