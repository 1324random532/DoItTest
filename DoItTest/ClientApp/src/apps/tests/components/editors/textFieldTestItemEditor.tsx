import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { Input } from "sharedComponents/inputs/input";
import { TextInput } from "sharedComponents/inputs/textInput";
import { SetState } from "tools/setState";

export interface TextFieldTestItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function TextFieldTestItemEditor({ item, changeItem }: TextFieldTestItemEditorProps) {

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
                onChange={question => {
                    changeItem({ ...item, question })
                    console.log(item)
                }}
                multiline
            />
            <Input
                type="text"
                label="Ответ"
                value={item.stringAnswer}
                onChange={answer => changeItem({ ...item, stringAnswer: answer })}
            />
        </Box>
    )
}