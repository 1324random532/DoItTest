import { StudentBlank } from "domain/students/studentBlank";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { Content } from "sharedComponents/content/content";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import useComponent from "tools/components/useComponent";
import { StudentRegistrationForm } from "./studentRegistrationForm";
import { PassingTestForm } from "./passingTestForm";
import { Student } from "domain/students/student";
import { Box, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import { TestInfo } from "domain/tests/testInfo";
import { TestsProvider } from "domain/tests/testsProvider";
import Timer from "sharedComponents/timer/timer";
import { getCookie, removeCookie } from "tools/Cookie";
import { StudentsProvider } from "domain/students/studentProvider";
import { TestItem } from "domain/tests/items/testItem";
import { Button } from "sharedComponents/buttons/button";
import { StudentTestInfo } from "domain/tests/studentTestInfo";

class State {
    constructor
        (
            public student: Student | null = null,
            public testInfo: TestInfo | null = null,
            public studentTestInfo: StudentTestInfo | null = null,
            public testItem: TestItem | null = null,
            public remainingTimeInSeconds: number | null = null,
            public startTimer: boolean = false,
            public errorMessage: String | null = null,
            public loading: boolean = true,
        ) { }
}

export function PassingTest() {

    const routeParams = useParams();

    const { showError } = useNotification()

    const blockUi = useBlockUi();

    const [state, setState] = useState<State>(new State())

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const testInfo = await TestsProvider.getTestInfo(routeParams.testId!)
                if (testInfo == null) return setState(prevState => ({ ...prevState, loading: false, errorMessage: "Тест не найден" }))

                const studentId = getCookie("studentId")
                if (String.isNullOrWhitespace(studentId)) return setState(prevState => ({ ...prevState, testInfo, loading: false }));

                const activeTestId = await TestsProvider.getActiveTestId(studentId)
                if (activeTestId == null || (activeTestId != null && activeTestId != testInfo.testId)) {
                    removeCookie("studentId")
                    return setState(prevState => ({ ...prevState, testInfo, loading: false }));
                }

                const student = await StudentsProvider.getStudent(studentId);
                if (student == null) return setState(prevState => ({ ...prevState, loading: false, errorMessage: "Студент не найден" ?? null }))

                const result = await TestsProvider.getItemForPassing(testInfo.testId, student.id);
                if (!result.isSuccess) return setState(prevState => ({ ...prevState, loading: false, errorMessage: result.errors.find(e => e != null)?.message ?? null }))

                const studentTestInfo = await TestsProvider.getStudentTestInfo(testInfo.testId, student.id)
                if (studentTestInfo == null) return setState(prevState => ({ ...prevState, loading: false, errorMessage: "Не удалось загрузить информацию о прохождении теста" }))

                const currentDateTime = new Date();
                const passageTimeInSeconds = (currentDateTime.getTime() - studentTestInfo.beginDateTime.getTime()) / 1000
                const remainingTimeInSeconds = testInfo.timeToCompleteInSeconds - passageTimeInSeconds
                const timeIsUp = remainingTimeInSeconds <= 0

                setState(prevState => ({ ...prevState, testInfo, student, testItem: timeIsUp ? null : result.data, remainingTimeInSeconds: timeIsUp ? 0 : remainingTimeInSeconds, startTimer: !timeIsUp, studentTestInfo, loading: false }))
            })
        }
    })

    async function finishTest(studentId: string, testId: string) {
        const result = await TestsProvider.finishTest(studentId, testId)
        if (!result.isSuccess) return showError(result.errors[0].message)

        setState(prevState => ({ ...prevState, startTimer: false, testItem: null }))
        return removeCookie("studentId")
    }

    function startTest(student: Student, testItem: TestItem) {
        setState(prevState => ({ ...prevState, student, testItem, startTimer: true }))
    }

    function setStartTimer(startTimer: boolean) {
        setState(prevState => ({ ...prevState, startTimer }))
    }

    function setTestItem(testItem: TestItem | null) {
        setState(prevState => ({ ...prevState, testItem }))
    }

    return (
        <Content withSidebar={false} backGroundColor="rgb(246, 246, 246)">
            {
                !state.loading &&
                <Box height={1} paddingTop={"10%"}>
                    <Box height={1} paddingBottom={"10%"} sx={{ display: "table" }}>
                        {
                            state.errorMessage == null && state.testInfo != null ?
                                <Card sx={{ minWidth: "700px", maxWidth: "1000px" }}>
                                    <CardHeader title={state.testInfo.title} sx={{ color: "white", backgroundColor: "#2196f3" }}
                                        action={<Timer seconds={state.remainingTimeInSeconds ?? state.testInfo.timeToCompleteInSeconds}
                                            start={state.startTimer}
                                            sx={{ fontSize: 25 }}
                                            finish={() => state.student != null && finishTest(state.student.id, state.testInfo!.testId)} />} />
                                    <CardContent sx={{
                                        "&:last-child": {
                                            padding: 3,
                                            paddingBottom: 2,
                                        }
                                    }}>
                                        {
                                            state.student != null ?
                                                <PassingTestForm
                                                    student={state.student}
                                                    testInfo={state.testInfo}
                                                    studentTestInfo={state.studentTestInfo}
                                                    testItem={state.testItem}
                                                    setTestItem={setTestItem}
                                                    finishTest={finishTest}
                                                    setStartTimer={setStartTimer} />
                                                :
                                                <>
                                                    <Typography sx={{ fontSize: 20 }}>Количество вопросов: {state.testInfo.testItemCount}</Typography>
                                                    <StudentRegistrationForm testId={state.testInfo.testId} startTest={startTest} />
                                                </>
                                        }
                                    </CardContent>
                                </Card>
                                : <Paper
                                    elevation={3}
                                    sx={{ minWidth: 200, minHeight: 100, backgroundColor: "#ffa199", display: "flex", justifyContent: "center", alignItems: "center", padding: 3 }}
                                >
                                    {state.errorMessage}
                                    {
                                        state.errorMessage != "Тест не найден" &&
                                        <Button
                                            sx={{ width: 230, height: 50 }} variant="contained" color="success"
                                            onClick={() => {
                                                removeCookie("studentId")
                                                window.location.reload()
                                            }}>Перепройти</Button>
                                    }
                                </Paper>
                        }
                    </Box>
                </Box>
            }
        </Content >
    )
}