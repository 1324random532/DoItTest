import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material"
import { Answer } from "domain/answers/answer";
import { TextFieldItem } from "domain/tests/items/textFieldItem";
import { TestItemBlank } from "domain/tests/testItemBlank"
import { Color } from "tools/colors";

export interface PassingTextFieldTestItemInfoProps {
    item: TextFieldItem
    answer: Answer | null
    sx?: SxProps<Theme>;
}


export function PassingTextFieldTestItemInfo({ item, answer, sx }: PassingTextFieldTestItemInfoProps) {
    return (
        <>
            <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                Ответ: {item.answerOption.answer}

            </Typography>
            {
                answer == null
                    ? <Typography sx={{ backgroundColor: Color.error(), padding: 1, borderRadius: 1 }}>Нет ответа</Typography>
                    : !answer.isTrue && <Typography variant="body2" sx={{ wordWrap: "break-word", backgroundColor: Color.error(), padding: 1, borderRadius: 1 }}>Ответ студента: {answer.stringAnswer}</Typography>
            }

        </>
    )
}