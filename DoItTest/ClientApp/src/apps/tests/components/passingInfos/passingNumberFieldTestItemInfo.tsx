import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material"
import { Answer } from "domain/answers/answer"
import { NumberFieldItem } from "domain/tests/items/numberFieldItem"
import { TestItemBlank } from "domain/tests/testItemBlank"
import { Color } from "tools/colors"

export interface PassingNumberFieldTestItemInfoProps {
    item: NumberFieldItem
    answer: Answer | null
    sx?: SxProps<Theme>
}


export function PassingNumberFieldTestItemInfo({ item, answer, sx }: PassingNumberFieldTestItemInfoProps) {

    return (
        <>
            <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                Ответ: {`${item.answerOption.answer}`}
            </Typography>
            {
                answer == null
                    ? <Typography sx={{ backgroundColor: Color.error(), padding: 1, borderRadius: 1 }}>Нет ответа</Typography>
                    : !answer.isTrue && <Typography variant="body2" sx={{ wordWrap: "break-word", backgroundColor: Color.error(), padding: 1, borderRadius: 1 }}>Ответ студента: {answer.numberAnswer}</Typography>
            }
        </>
    )
}

