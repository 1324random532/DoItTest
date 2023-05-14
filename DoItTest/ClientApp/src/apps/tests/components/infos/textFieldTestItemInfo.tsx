import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material"
import { TestItemBlank } from "domain/tests/testItemBlank"

export interface TextFieldTestItemEditorProps {
    item: TestItemBlank
    sx?: SxProps<Theme>;
}


export function TextFieldTestItemInfo({ item, sx }: TextFieldTestItemEditorProps) {
    return (
        <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
            Ответ: {item.answerOption?.stringAnswer}
        </Typography>
    )
}