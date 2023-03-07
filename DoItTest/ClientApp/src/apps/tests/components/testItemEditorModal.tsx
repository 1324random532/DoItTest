import { VerticalAlignCenter } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Modal, Typography } from "@mui/material";
import { style } from "@mui/system";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import Dialog from "sharedComponents/dialog/dialog";
import { Autocomplete } from "sharedComponents/inputs/autocomplete";
import { Input } from "sharedComponents/inputs/input";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import useComponent from "tools/components/useComponent";
import { Enum } from "tools/enum";
import { Result } from "tools/results/result";
import { ResultError } from "tools/results/resultError";
import { SetState } from "tools/setState";
import { TestItemEditor } from "./editors/testItemEditor";

export interface TestItemEditorModalProps {
    testItem: TestItemBlank
    open: boolean
    onClose: () => void
    changeTestItemBlank: (itemBlank: TestItemBlank) => void
}

export default function TestItemEditorModal(props: TestItemEditorModalProps) {

    const [item, setItem] = useState<TestItemBlank>(props.testItem)

    const { showError } = useNotification()

    useEffect(() => {
        setItem(props.testItem)
    }, [props.testItem])

    const testItemTypes = useMemo<TestItemType[]>(() => Enum.getNumberValues(TestItemType), []);
    const title = props.testItem.isCreated ? "Изменение вопроса" : "Добаление вопроса"

    function saveItem() {
        const validateResult = ValidateTestItem(item)
        if (!validateResult.isSuccess) return showError(validateResult.errors[0].message)

        item.isCreated = true
        props.changeTestItemBlank(item)
    }

    return (
        <Dialog
            isOpen={props.open}
            onClose={props.onClose}
            title={title}
            actionsContent={<Button
                title="Сохранить"
                onClick={saveItem}
            >
                Сохранить
            </Button>}
        >
            <Box sx={{
                width: 500,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <Input
                    type="select"
                    label="Тип вопроса"
                    value={item.type}
                    options={testItemTypes}
                    getOptionLabel={TestItemType.getDisplayName}
                    onChange={type => setItem({ ...item, type, answerOptions: [], answerOption: null })}
                />
                <Input
                    type='text'
                    label="Вопрос"
                    value={item.question ?? ""}
                    onChange={question => setItem({ ...item, question })}
                    multiline
                />

                <TestItemEditor item={item} changeItem={setItem} />
            </Box>
        </Dialog >
    );
}

export function ValidateTestItem(testItem: TestItemBlank): Result {
    let errors = [] as ResultError[]
    if (String.isNullOrEmpty(testItem.question)) errors.push(new ResultError(null, "Напишите вопрос"));
    if (testItem.type == null) errors.push(new ResultError(null, "Укажите тип вопроса"));

    if (testItem.type == TestItemType.TextField) {
        if (String.isNullOrEmpty(testItem.answerOption?.stringAnswer)) errors.push(new ResultError(null, "Напишите ответ"));
    }

    if (testItem.type == TestItemType.NumericField) {
        if (testItem.answerOption?.numberAnswer == null) errors.push(new ResultError(null, "Напишите ответ"));
    }

    if (testItem.type == TestItemType.RadioButtonsGroup || testItem.type == TestItemType.CheckboxesGroup) {
        if (testItem.answerOptions.length < 2) errors.push(new ResultError(null, "Создайте хотябы 2 варианта ответа"));

        const trueAnswerOptions = testItem.answerOptions.filter(o => o.isTrue)
        if (testItem.type == TestItemType.RadioButtonsGroup && trueAnswerOptions.length == 0) errors.push(new ResultError(null, "Укажите правильный ответ"));
        if (testItem.type == TestItemType.CheckboxesGroup && trueAnswerOptions.length == 0) errors.push(new ResultError(null, "Укажите правильный ответы"));

        const withoutTitleAnswers = testItem.answerOptions.filter(o => String.isNullOrEmpty(o.title))
        if (withoutTitleAnswers.length != 0) errors.push(new ResultError(null, "Все ответы должны иметь заголовок"));
    }

    return new Result(errors)
}