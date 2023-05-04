import { Box, SxProps, Theme } from "@mui/material";
import { AnswerBlank } from "domain/answers/answerBlank";
import { NumberFieldItem } from "domain/tests/items/numberFieldItem";
import { TextFieldItem } from "domain/tests/items/textFieldItem";
import { Input } from "sharedComponents/inputs/input";
import { SetState } from "tools/setState";

export interface PassingNumberFieldItemProps {
    item: NumberFieldItem;
    answer: AnswerBlank;
    changeAnswer: SetState<AnswerBlank>;
    sx?: SxProps<Theme>;
}


export function PassingNumberFieldItem({ item, answer, changeAnswer, sx }: PassingNumberFieldItemProps) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <Input
                type="number"
                label="Ответ"
                value={answer.numberAnswer}
                onChange={numberAnswer => changeAnswer({ ...answer, numberAnswer })}
            />
        </Box>
    )
}