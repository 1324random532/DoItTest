import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SxProps, Theme, Typography } from "@mui/material"
import { AnswerBlank } from "domain/answers/answerBlank";
import { CheckboxesItem } from "domain/tests/items/checkboxesItem";
import { RadioButtonItem } from "domain/tests/items/radioButtonItem";
import { SetState } from "tools/setState";

export interface passingCheckBoxesItemProps {
    item: CheckboxesItem;
    answer: AnswerBlank;
    changeAnswer: SetState<AnswerBlank>;
    sx?: SxProps<Theme>;
}


export function PassingCheckBoxesItem({ item, answer, changeAnswer, sx }: passingCheckBoxesItemProps) {

    function replaceAnswer(e: React.ChangeEvent<HTMLInputElement>, value: string, isChecked: boolean) {
        let answerOptionIds = answer.answerOptionIds
        if (isChecked) {
            answerOptionIds.push(value)
        }
        else {
            answerOptionIds = answerOptionIds.filter(i => i != value)
        }
        changeAnswer({ ...answer, answerOptionIds })
    }

    return (
        <FormGroup>
            {
                item.answerOptions.map(o => {
                    return <FormControlLabel
                        key={o.id}
                        control={
                            <Checkbox
                                checked={answer.answerOptionIds.includes(o.id)}
                                onChange={(e, isChecked) => replaceAnswer(e, o.id, isChecked)}
                            />
                        }
                        label={o.title} />
                })
            }
        </FormGroup>
    )
}