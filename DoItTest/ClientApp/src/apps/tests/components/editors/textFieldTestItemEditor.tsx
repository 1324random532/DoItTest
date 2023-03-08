import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { AnswerOptionBlank } from "domain/tests/answerOptionBlank";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useEffect, useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { Input } from "sharedComponents/inputs/input";
import { TextInput } from "sharedComponents/inputs/textInput";
import { SetState } from "tools/setState";

export interface TextFieldTestItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function TextFieldTestItemEditor({ item, changeItem }: TextFieldTestItemEditorProps) {

    const [answerOption, setAnswerOption] = useState<AnswerOptionBlank>(item.answerOption ?? AnswerOptionBlank.getDefault(item.type!))

    useEffect(() => changeItem({ ...item, answerOption }), [answerOption])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <Input
                type="text"
                label="Ответ"
                value={answerOption.stringAnswer}
                onChange={stringAnswer => setAnswerOption({ ...answerOption, stringAnswer })}
            />
        </Box>
    )
}