import { Box, SxProps, Theme } from "@mui/material";
import { AnswerBlank } from "domain/answers/answerBlank";
import { TextFieldItem } from "domain/tests/items/textFieldItem";
import { Input } from "sharedComponents/inputs/input";
import { SetState } from "tools/setState";

export interface PassingTextFieldItemProps {
    item: TextFieldItem;
    answer: AnswerBlank;
    changeAnswer: SetState<AnswerBlank>;
    sx?: SxProps<Theme>;
}


export function PassingTextFieldItem({ item, answer, changeAnswer, sx }: PassingTextFieldItemProps) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <Input
                type="text"
                label="Ответ"
                value={answer.stringAnswer}
                onChange={stringAnswer => changeAnswer({ ...answer, stringAnswer })}
            />
        </Box>
    )
}