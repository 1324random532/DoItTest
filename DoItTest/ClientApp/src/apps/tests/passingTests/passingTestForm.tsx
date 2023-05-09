import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Student } from "domain/students/student";
import { TestItem } from "domain/tests/items/testItem";
import { StudentTest } from "domain/tests/studentTest";
import { TestsProvider } from "domain/tests/testsProvider";
import { useState } from "react";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import useComponent from "tools/components/useComponent";
import { AnswerBlank } from "domain/answers/answerBlank";
import { Cookie } from "@mui/icons-material";
import { PassingTestItem } from "./passingTsetItems/passingTestItem";
import { Button } from "sharedComponents/buttons/button";
import { createCookie, removeCookie } from "tools/Cookie";
import { SetState } from "tools/setState";

export interface PassingTestCardProps {
    testId: string
    student: Student
    testItem: TestItem | null
    setTestItem: (testItem: TestItem | null) => void
    finishTest: (studentId: string, testId: string) => void
    setStartTimer: (startTimer: boolean) => void
}

export function PassingTestForm({ testId, student, testItem, setTestItem, finishTest, setStartTimer }: PassingTestCardProps) {

    const { showError } = useNotification()
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();

    const [answer, setAnswer] = useState<AnswerBlank>(AnswerBlank.getDefault(student.id, testId))

    async function answerQuestion(answerBlank: AnswerBlank) {
        const answerQuestionResult = await TestsProvider.answerQuestion(answerBlank)
        if (!answerQuestionResult.isSuccess) return showError(answerQuestionResult.errors[0].message);

        setTestItem(answerQuestionResult.data)

        if (answerQuestionResult.data == null) {
            setStartTimer(false)
            return removeCookie("studentId")
        }
    }

    return (
        <Box>
            {
                testItem != null
                    ? <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: 20, wordWrap: "break-word" }}>
                            {testItem.question}
                        </Typography>
                        {
                            testItem.imageBase64 &&
                            <Box sx={{ position: 'relative', marginTop: 1, marginBottom: 1 }}>
                                <Box width={1} height={300} sx={{ objectFit: 'contain' }} src={testItem.imageBase64} component='img'>
                                </Box>
                            </Box>
                        }
                        <PassingTestItem
                            item={testItem}
                            answer={answer}
                            changeAnswer={setAnswer}
                        />

                        <Box display="flex" gap={1}>
                            <Button onClick={() => answerQuestion(answer)}>Далее</Button>
                            <Button onClick={() => finishTest(student.id, testId)}>Завершить</Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography>Тест пройден</Typography>
                        <Box display="flex">
                            <Button onClick={() => {
                                removeCookie("studentId")
                                window.location.reload()
                            }}>
                                Перепройти
                            </Button>
                        </Box>
                    </Box>
            }
        </Box>
    )
}