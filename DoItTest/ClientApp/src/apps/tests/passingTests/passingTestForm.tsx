import { Box, Card, CardContent, CardHeader, Tooltip, Typography } from "@mui/material";
import { Student } from "domain/students/student";
import { TestItem } from "domain/tests/items/testItem";
import { TestsProvider } from "domain/tests/testsProvider";
import { useRef, useState } from "react";
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
import { TestInfo } from "domain/tests/testInfo";
import { StudentTestInfo } from "domain/tests/studentTestInfo";
import CustomizedProgressBars from "sharedComponents/progressBar/progressBar";

export interface PassingTestCardProps {
    student: Student
    testItem: TestItem | null
    testInfo: TestInfo
    studentTestInfo: StudentTestInfo | null
    setTestItem: (testItem: TestItem | null) => void
    finishTest: (studentId: string, testId: string) => void
    setStartTimer: (startTimer: boolean) => void
}

export function PassingTestForm({ student, testItem, testInfo, studentTestInfo, setTestItem, finishTest, setStartTimer }: PassingTestCardProps) {

    const { showError } = useNotification()

    const blockUi = useBlockUi();
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const [answer, setAnswer] = useState<AnswerBlank>(AnswerBlank.getDefault(student.id, testInfo.testId))
    const testItemNumber = useRef(studentTestInfo?.passedTestItemtCount ?? 1);

    async function answerQuestion(answerBlank: AnswerBlank) {
        const answerQuestionResult = await TestsProvider.answerQuestion(answerBlank)
        if (!answerQuestionResult.isSuccess) return showError(answerQuestionResult.errors[0].message);

        setAnswer(AnswerBlank.getDefault(student.id, testInfo.testId))
        setTestItem(answerQuestionResult.data)
        testItemNumber.current++

        if (answerQuestionResult.data == null) {
            setStartTimer(false)
            return removeCookie("studentId")
        }
    }

    async function endTest(studentId: string, testId: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите завершить тест?" })
        if (!result) return

        blockUi(async () => {
            finishTest(studentId, testId)
        })
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box><Typography sx={{ fontSize: 20 }}>Прогресс:</Typography> <CustomizedProgressBars value={testItemNumber.current} maxValue={testInfo.testItemCount} /> </Box>
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

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Button onClick={() => endTest(student.id, testInfo.testId)} sx={{ width: 230, height: 50 }} variant="contained" color="error">Завершить тест</Button>
                            <Button onClick={() => answerQuestion(answer)} sx={{ width: 230, height: 50 }} variant="contained" color="success">Далее</Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box display="flex">
                            <Button
                                sx={{ height: 50, width: "100%" }} variant="contained" color="success"
                                onClick={() => {
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
