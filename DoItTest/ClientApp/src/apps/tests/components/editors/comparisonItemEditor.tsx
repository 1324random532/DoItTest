import { Box, FormGroup } from "@mui/material"
import { AnswerOptionBlank } from "domain/tests/answerOptionBlank"
import { AnswerOptionGroupBlank } from "domain/tests/items/answerOption/answerOptionGroups/answerOptionGroupBlank"
import { TestItemBlank } from "domain/tests/testItemBlank"
import { useState, useEffect } from "react"
import { Button } from "sharedComponents/buttons/button"
import { IconButton } from "sharedComponents/buttons/iconButton"
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2"
import useDialog from "sharedComponents/dialog/useDialog"
import { Input } from "sharedComponents/inputs/input"
import { SetState } from "tools/setState"

export interface ComparisonItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function ComparisonItemEditor({ item, changeItem }: ComparisonItemEditorProps) {

    const [answerOptionGroups, setAnswerOptionGroups] = useState<AnswerOptionGroupBlank[]>(item.answerOptionGroups)
    const confirmDialog = useDialog(ConfirmDialogAsync)

    useEffect(() => changeItem({ ...item, answerOptionGroups }), [answerOptionGroups])

    function removeAnswerOptionGroup(groupKey: string) {
        setAnswerOptionGroups(prev => {
            const answerOptionGroups = [...prev]
            return answerOptionGroups.filter(g => g.key != groupKey)
        })
    }

    function changeGroupName(key: string, name: string) {
        setAnswerOptionGroups(prev => {
            const answerOptionGroups = [...prev]
            const index = answerOptionGroups.findIndex(a => a.key == key)
            if (index !== -1) answerOptionGroups[index].name = name
            return answerOptionGroups
        })
    }

    function addComparisonAnswerOption(key: string) {
        setAnswerOptionGroups(prev => {
            const answerOptionGroups = [...prev]
            const index = answerOptionGroups.findIndex(a => a.key == key)
            if (index !== -1) {
                answerOptionGroups[index].answerOptions.push({ ...AnswerOptionBlank.getDefault(item.type!) })
            }
            return answerOptionGroups
        })
    }

    function changeComparisonAnswerOptionTitle(title: string, groupKey: string, comparisonAnswerOptionKey: string) {
        setAnswerOptionGroups(prev => {
            const answerOptionGroups = [...prev]
            const groupIndex = answerOptionGroups.findIndex(a => a.key == groupKey)
            if (groupIndex !== -1) {
                const comparisonAnswerOptionIndex = answerOptionGroups[groupIndex].answerOptions.findIndex(o => o.key == comparisonAnswerOptionKey)
                answerOptionGroups[groupIndex].answerOptions[comparisonAnswerOptionIndex].title = title
            }
            return answerOptionGroups
        })
    }

    function removeComparisonAnswerOption(groupKey: string, comparisonAnswerOptionKey: string) {
        setAnswerOptionGroups(prev => {
            const answerOptionGroups = [...prev]
            const groupIndex = answerOptionGroups.findIndex(a => a.key == groupKey)
            if (groupIndex !== -1) {
                const comparisonAnswerOptions = answerOptionGroups[groupIndex].answerOptions.filter(o => o.key != comparisonAnswerOptionKey)
                answerOptionGroups[groupIndex].answerOptions = comparisonAnswerOptions
            }
            return answerOptionGroups
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
                    answerOptionGroups.map(g =>
                        <Box sx={{ display: "flex" }} key={g.key} flexDirection="column" gap={2}>
                            <Box display="flex" alignItems="center">

                                <Input

                                    type="text"
                                    label="Группа"
                                    value={g.name}
                                    onChange={name => changeGroupName(g.key, name)}
                                />
                                <Box ml={1}>
                                    <IconButton
                                        icon='add'
                                        onClick={() => { addComparisonAnswerOption(g.key) }}
                                        title='Добавить в группу' />
                                </Box>
                                <Box mr={-1}>
                                    <IconButton
                                        icon='delete'
                                        onClick={() => removeAnswerOptionGroup(g.key)}
                                        title='Удалить группу' />
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                                {
                                    g.answerOptions.map(o =>
                                        <Box sx={{ display: "flex", paddingLeft: 5 }} key={o.key}>
                                            <Input
                                                type="text"
                                                label="Относящийся элемент"
                                                value={o.title}
                                                onChange={title => { changeComparisonAnswerOptionTitle(title, g.key, o.key) }}
                                            />
                                            <IconButton
                                                icon='delete'
                                                onClick={() => removeComparisonAnswerOption(g.key, o.key)}
                                                title='Удалить элемент'
                                                sx={{ mr: 4, ml: 1 }} />
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    )
                }
            </FormGroup>
            <Button
                title="Добавить вариант ответа"
                onClick={() => {
                    setAnswerOptionGroups(prev => {
                        const answerOptions = [...prev]
                        answerOptions.push(AnswerOptionGroupBlank.getDefault())
                        return answerOptions
                    })
                }}
            >
                Добавить группу
            </Button>
        </Box>
    )
}