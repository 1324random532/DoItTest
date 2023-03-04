import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { Input } from "sharedComponents/inputs/input";
import { TextInput } from "sharedComponents/inputs/textInput";
import { SetState } from "tools/setState";

export interface NumberFieldTestItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function NumberFieldTestItemEditor({ item, changeItem }: NumberFieldTestItemEditorProps) {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <Input
                type='text'
                label="Вопрос"
                value={item.question ?? ""}
                onChange={question => changeItem({ ...item, question })}
                multiline
            />
            <Input
                type="number"
                label="Ответ"
                value={item.numberAnswer}
                onChange={answer => changeItem({ ...item, numberAnswer: answer })}
            />
        </Box>
    )
}