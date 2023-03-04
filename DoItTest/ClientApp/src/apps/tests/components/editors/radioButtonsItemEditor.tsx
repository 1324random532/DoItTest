import { Card, CardContent, CardHeader, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import { AnserOptionBlank } from "domain/tests/anserOptionBlank";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { Button } from "sharedComponents/buttons/button";
import { Input } from "sharedComponents/inputs/input";
import { SetState } from "tools/setState";

export interface RadioButtonsItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function RadioButtonsItemEditor({ item, changeItem }: RadioButtonsItemEditorProps) {
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
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={item.answerKey}
                onChange={(_, value) => changeItem({ ...item, answerKey: value })}
                sx={{ gap: 2 }}
            >
                {
                    item.answerOptions.map(o =>
                        <Box sx={{ display: "flex" }}>
                            <Radio value={o.key}
                                sx={{
                                    flexBasis: 50
                                }}
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
            </RadioGroup>

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