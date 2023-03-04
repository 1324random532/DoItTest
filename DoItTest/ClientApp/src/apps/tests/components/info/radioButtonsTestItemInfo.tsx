import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SxProps, Theme, Typography } from "@mui/material"
import { TestItemBlank } from "domain/tests/testItemBlank"

export interface RadioButtonsTestItemEditorProps {
    item: TestItemBlank
    sx?: SxProps<Theme>;
}


export function RadioButtonsFieldTestItemInfo({ item, sx }: RadioButtonsTestItemEditorProps) {
    return (
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={item.answerKey}
            sx={{ gap: 2 }}
        >
            {
                item.answerOptions.map(o =>
                    <FormControlLabel value="female" control={<Radio value={o.key} />} label={o.title} />
                )
            }
        </RadioGroup>
    )
}