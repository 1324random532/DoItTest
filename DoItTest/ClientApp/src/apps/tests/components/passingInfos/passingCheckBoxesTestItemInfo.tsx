import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, SxProps, Theme, Typography } from "@mui/material"
import { Answer } from "domain/answers/answer";
import { CheckboxesItem } from "domain/tests/items/checkboxesItem";
import { TestItemBlank } from "domain/tests/testItemBlank"
import { Color } from "tools/colors";

export interface PassingCheckBoxesTestItemInfoProps {
    item: CheckboxesItem
    answer: Answer | null
    sx?: SxProps<Theme>;
}


export function PassingCheckBoxesTestItemInfo({ item, answer, sx }: PassingCheckBoxesTestItemInfoProps) {
    return (
        <FormGroup>
            {
                item.answerOptions.map(o => {
                    const isSelectedThisOption = answer != null && answer.answerOptionIds.includes(o.id)
                    let color = "default"
                    if (o.isTrue) color = Color.succes()
                    if (isSelectedThisOption && !o.isTrue) color = Color.error()

                    return <FormControlLabel
                        key={o.id}
                        control={<Checkbox
                            checked={isSelectedThisOption}
                            sx={{
                                color: color,
                                '&.Mui-checked': {
                                    color: color,
                                }
                            }}
                            readOnly
                        />}
                        label={o.title} />
                })
            }
        </FormGroup>
    )
}