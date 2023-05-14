import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SxProps, Theme, Typography } from "@mui/material"
import { Answer } from "domain/answers/answer";
import { RadioButtonAnswerOption } from "domain/tests/items/answerOption/radioButtonAnswerOption";
import { RadioButtonItem } from "domain/tests/items/radioButtonItem";
import { TestItemBlank } from "domain/tests/testItemBlank"
import { Color } from "tools/colors";

export interface PassingRadioButtonsTestItemInfoProps {
    item: RadioButtonItem
    answer: Answer | null
    sx?: SxProps<Theme>;
}


export function PassingRadioButtonsTestItemInfo({ item, answer, sx }: PassingRadioButtonsTestItemInfoProps) {

    return (
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={item.answerOptions.find(o => o.isTrue)}
            sx={{ gap: 2 }}
        >
            {
                item.answerOptions.map(o => {
                    const isSelectedThisOption = answer != null && o.id == answer.answerOptionId
                    let color = "default"
                    if (o.isTrue) color = Color.succes()
                    if (isSelectedThisOption && !o.isTrue) color = Color.error()

                    return <FormControlLabel
                        key={o.id}
                        control={<Radio checked={isSelectedThisOption} sx={{
                            color: color,
                            '&.Mui-checked': {
                                color: color,
                            }
                        }} />}
                        label={o.title} />
                }

                )
            }
        </RadioGroup>
    )
}