import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, SxProps, Theme, Typography } from "@mui/material"
import { TestItemBlank } from "domain/tests/testItemBlank"

export interface CheckBoxesTestItemInfoProps {
    item: TestItemBlank
    sx?: SxProps<Theme>;
}


export function CheckBoxesTestItemInfo({ item, sx }: CheckBoxesTestItemInfoProps) {
    return (
        <FormGroup>
            {
                item.answerOptions.map(o => {
                    const isСorrect = item.answerKeys.includes(o.key)
                    return <FormControlLabel control={<Checkbox checked={isСorrect} />} label={o.title} />
                })
            }
        </FormGroup>
    )
}