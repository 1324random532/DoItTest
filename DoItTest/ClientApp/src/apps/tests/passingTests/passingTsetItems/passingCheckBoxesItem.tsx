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

    function replaceAnswer(e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) {
        let answerOptionIds = answer.answerOptionIds
        if (isChecked) {
            answerOptionIds.push(e.target.value)
        }
        else {
            answerOptionIds = answerOptionIds.filter(i => i != e.target.value)
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
                                onChange={replaceAnswer}
                            />
                        }
                        label={o.title} />
                })
            }
        </FormGroup>
    )
}