import { FormControlLabel, FormGroup, Radio, RadioGroup, SxProps, Theme, Typography } from "@mui/material"
import { AnswerBlank } from "domain/answers/answerBlank";
import { RadioButtonItem } from "domain/tests/items/radioButtonItem";
import { SetState } from "tools/setState";

export interface passingRadioButtonsItemProps {
    item: RadioButtonItem;
    answer: AnswerBlank;
    changeAnswer: SetState<AnswerBlank>;
    sx?: SxProps<Theme>;
}


export function PassingRadioButtonsItem({ item, answer, changeAnswer, sx }: passingRadioButtonsItemProps) {
    return (
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={item.answerOptions.find(o => o.id == answer.answerOptionId)}
            sx={{ gap: 2 }}
        >
            {
                item.answerOptions.map(o =>
                    <FormControlLabel
                        key={o.id}
                        control={<Radio checked={answer.answerOptionId == o.id} />}
                        onChange={() => changeAnswer({ ...answer, answerOptionId: o.id })}
                        label={o.title} />
                )
            }
        </RadioGroup>
    )
}