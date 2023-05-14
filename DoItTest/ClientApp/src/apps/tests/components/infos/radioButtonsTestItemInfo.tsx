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
            value={item.answerOptions.find(o => o.isTrue)}
            sx={{ gap: 2 }}
        >
            {
                item.answerOptions.map(o =>
                    <FormControlLabel
                        key={o.key}
                        control={<Radio checked={o.isTrue ?? false} />}
                        label={o.title} />
                )
            }
        </RadioGroup>
    )
}