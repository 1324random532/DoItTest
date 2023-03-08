import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import { AnswerOptionBlank } from "domain/tests/answerOptionBlank";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useEffect, useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { IconButton } from "sharedComponents/buttons/iconButton";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { Input } from "sharedComponents/inputs/input";
import { SetState } from "tools/setState";

export interface CheckBoxesItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function CheckBoxesItemEditor({ item, changeItem }: CheckBoxesItemEditorProps) {

    const [answerOptions, setAnswerOptions] = useState<AnswerOptionBlank[]>(item.answerOptions)
    const confirmDialog = useDialog(ConfirmDialogAsync)


    useEffect(() => changeItem({ ...item, answerOptions }), [answerOptions])

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
            if (index !== -1) answerOptions[index].isTrue = checked
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
            <FormGroup sx={{ gap: 2 }}>
                {
                    answerOptions.map(o =>
                        <Box display="flex" alignItems="center" key={o.key}>
                            <Checkbox
                                onChange={(_, checked) => { changeChecked(o.key, checked) }}
                                checked={o.isTrue ?? false}
                            />
                            <Input
                                type="text"
                                label="Вариант ответа"
                                value={o.title}
                                onChange={value => changeTitle(o.key, value)}
                            />
                            <IconButton
                                icon='delete'
                                onClick={() => remove(o.key)}
                                title='Удалить тест' />
                        </Box>
                    )
                }
            </FormGroup>
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