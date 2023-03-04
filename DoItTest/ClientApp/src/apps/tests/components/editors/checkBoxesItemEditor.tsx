import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import { AnserOptionBlank } from "domain/tests/anserOptionBlank";
import { AnserOption } from "domain/tests/items/anserOption";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { Input } from "sharedComponents/inputs/input";
import { SetState } from "tools/setState";

export interface CheckBoxesItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function CheckBoxesItemEditor({ item, changeItem }: CheckBoxesItemEditorProps) {
    function setAnswerOption(key: string, title: string) {
        changeItem(prev => {
            const item = { ...prev }
            const index = item.answerOptions.findIndex(o => o.key === key)
            if (index !== -1) item.answerOptions[index].title = title
            return item
        })
    }

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
            <FormGroup sx={{ gap: 2 }}>
                {
                    item.answerOptions.map(o =>
                        <Box sx={{ display: "flex" }}>
                            <Checkbox
                                onChange={(_, checked) => {
                                    let stringAnsres = item.answerKeys
                                    checked ? stringAnsres.push(o.key) : stringAnsres = stringAnsres.filter(a => a != o.key)
                                    changeItem({ ...item, answerKeys: stringAnsres })
                                }}
                                checked={item.answerKeys.includes(o.key)}
                                sx={{ flexBasis: 50 }}
                            />
                            <Input
                                type="text"
                                label="Вариант ответа"
                                value={o.title}
                                onChange={value => setAnswerOption(o.key, value)}
                                sx={{
                                    flexBasis: "100%"
                                }}
                            />
                        </Box>
                    )
                }
            </FormGroup>
            <Button
                title="Добавить вариант ответа"
                onClick={() => {
                    const answerOptions = item.answerOptions
                    answerOptions.push(AnserOptionBlank.getDefault())
                    changeItem({ ...item, answerOptions })
                }}
            >
                Добавить вариант ответа
            </Button>
        </Box>
    )
}