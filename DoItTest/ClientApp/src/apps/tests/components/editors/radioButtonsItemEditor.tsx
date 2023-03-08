import { Card, CardContent, CardHeader, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import { AnswerOptionBlank } from "domain/tests/answerOptionBlank";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useEffect, useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { IconButton } from "sharedComponents/buttons/iconButton";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { Input } from "sharedComponents/inputs/input";
import { SetState } from "tools/setState";

export interface RadioButtonsItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function RadioButtonsItemEditor({ item, changeItem }: RadioButtonsItemEditorProps) {
    const [answerOptions, setAnswerOptions] = useState<AnswerOptionBlank[]>(item.answerOptions)

    useEffect(() => changeItem({ ...item, answerOptions }), [answerOptions])
    const confirmDialog = useDialog(ConfirmDialogAsync)

    function changeTitle(key: string, title: string) {
        setAnswerOptions(prev => {
            const answerOptions = [...prev]
            const index = answerOptions.findIndex(a => a.key == key)
            if (index !== -1) answerOptions[index].title = title
            return answerOptions
        })
    }

    function changeChecked(key: string, checked: boolean) {
        setAnswerOptions(prev => {
            const answerOptions = [...prev]
            const index = answerOptions.findIndex(a => a.key == key)
            if (index !== -1) {
                answerOptions.forEach(o => {
                    o.isTrue = false
                });
                answerOptions[index].isTrue = checked
            }
            return answerOptions
        })
    }

    async function remove(key: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите удалить данный вопрос?" })
        if (!result) return

        setAnswerOptions(prev => {
            let answerOptions = [...prev]
            answerOptions = answerOptions.filter(o => o.key != key)
            return answerOptions
        })
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={answerOptions.find(o => o.isTrue)?.key ?? null}
                onChange={(e, value) => changeChecked(value, e.currentTarget.checked)}
                sx={{ gap: 2 }}
            >
                {
                    answerOptions.map(o =>
                        <Box display="flex" alignItems="center" key={o.key}>
                            <Radio value={o.key} />
                            <Input
                                type="text"
                                label="Вариант ответа"
                                value={o.title}
                                onChange={value => changeTitle(o.key, value)}
                                sx={{
                                    flexBasis: "100%"
                                }}
                            />
                            <IconButton
                                icon='delete'
                                onClick={() => remove(o.key)}
                                title='Удалить тест' />
                        </Box>
                    )
                }
            </RadioGroup>

            <Button
                title="Добавить вариант ответа"
                onClick={() => {
                    setAnswerOptions(prev => {
                        const answerOptions = [...prev]
                        answerOptions.push(AnswerOptionBlank.getDefault(item.type!, false))
                        return answerOptions
                    })
                }}
            >
                Добавить вариант ответа
            </Button>
        </Box>
    )
}