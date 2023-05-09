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

export interface PassingTestCardProps {
    testId: string
    student: Student
    finishTest: (studentId: string, testId: string) => void
    setStartTimer: (startTimer: boolean) => void
}

class State {
    constructor
        (
            public testItem: TestItem | null = null,
            public errorss: String[] = [],
            public loading: boolean = true
        ) { }
}

export function PassingTestForm({ testId, student, finishTest, setStartTimer }: PassingTestCardProps) {

    const { showError } = useNotification()
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();

    const [state, setState] = useState<State>(new State())
    const [answer, setAnswer] = useState<AnswerBlank>(AnswerBlank.getDefault(student.id, testId))

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const result = await TestsProvider.getItemForPassing(testId, student.id);
                if (!result.isSuccess) {
                    return setState(prevState => ({ ...prevState, loading: false, errorss: result.errors.map(e => e.message) }))
                }
                setState(prevState => ({ ...prevState, loading: false, testItem: result.data }))
            })
        }
    })

    async function answerQuestion(answerBlank: AnswerBlank) {
        const answerQuestionResult = await TestsProvider.answerQuestion(answerBlank)
        if (!answerQuestionResult.isSuccess) return showError(answerQuestionResult.errors[0].message);

        setState(prevState => ({ ...prevState, testItem: answerQuestionResult.data }))

        if (answerQuestionResult.data == null) {
            setStartTimer(false)
            return removeCookie("studentId")
        }
    }

    return (
        <>
            {
                !state.loading &&
                <Box>
                    {
                        state.errorss.length != 0
                            ? <>{state.errorss.map(e => e)}</>
                            : <>
                                {
                                    state.testItem != null
                                        ? <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                            <Typography variant="body2" sx={{ fontSize: 20, wordWrap: "break-word" }}>
                                                {state.testItem.question}
                                            </Typography>
                                            {
                                                state.testItem.imageBase64 &&
                                                <Box sx={{ position: 'relative', marginTop: 1, marginBottom: 1 }}>
                                                    <Box width={1} height={300} sx={{ objectFit: 'contain' }} src={state.testItem.imageBase64} component='img'>
                                                    </Box>
                                                </Box>
                                            }
                                            <PassingTestItem
                                                item={state.testItem}
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
                            </>
                    }
                </Box>
            }
        </>
    )
}