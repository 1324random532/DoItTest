import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material"
import { TestItemBlank } from "domain/tests/testItemBlank"

export interface NumberFieldTestItemEditorProps {
    item: TestItemBlank
    sx?: SxProps<Theme>
}


export function NumberFieldTestItemInfo({ item, sx }: NumberFieldTestItemEditorProps) {

    return (
        <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
            Ответ: {`${item.answerOption?.numberAnswer}`}
        </Typography>
    )
}

