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
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { TestInfo } from "domain/tests/testInfo";
import { TestsProvider } from "domain/tests/testsProvider";
import Timer from "sharedComponents/timer/timer";
import { getCookie } from "tools/Cookie";
import { StudentsProvider } from "domain/students/studentProvider";
import { TestItem } from "domain/tests/items/testItem";

class State {
    constructor
        (
            public student: Student | null = null,
            public testInfo: TestInfo | null = null,
            public testItem: TestItem | null = null,
            public remainingTimeInSeconds: number | null = null,
            public startTimer: boolean = false,
            public pauseTimer: boolean = false,
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
                if (testInfo == null) return setState(prevState => ({ ...prevState, loading: false, errorMessage: "Информация по тесту отсутствует" }))

                const studentId = getCookie("studentId")
                if (String.isNullOrWhitespace(studentId)) return setState(prevState => ({ ...prevState, testInfo, loading: false }));

                const student = await StudentsProvider.getStudent(studentId);

                const result = await TestsProvider.getItemForPassing(testInfo.testId, student.id);
                if (!result.isSuccess) return setState(prevState => ({ ...prevState, loading: false, errorss: result.errors.map(e => e.message) }))

                const beginDateTime = await TestsProvider.getStartTestBeginDateTime(testInfo.testId, student.id)
                if (beginDateTime == null) return setState(prevState => ({ ...prevState, loading: false, errorMessage: "Не удалось загрузить время прохождения" }))

                const currentDateTime = new Date();
                const passageTimeInSeconds = (currentDateTime.getTime() - beginDateTime.getTime()) / 1000
                const remainingTimeInSeconds = testInfo.timeToCompleteInSeconds - passageTimeInSeconds

                setState(prevState => ({ ...prevState, testInfo, student, testItem: result.data, remainingTimeInSeconds: remainingTimeInSeconds > 0 ? remainingTimeInSeconds : 0, startTimer: true, loading: false }))
            })
        }
    })

    async function finishTest(studentId: string, testId: string) {
        const result = await TestsProvider.finishTest(studentId, testId)
        if (!result.isSuccess) return showError(result.errors[0].message)

        setState(prevState => ({ ...prevState, startTimer: false, testItem: null }))
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
        <Content withSidebar={false}>
            {
                !state.loading &&
                <Box sx={{ paddingTop: "5%" }}>
                    {
                        state.errorMessage == null && state.testInfo != null ?
                            <Card sx={{ width: "600px" }}>
                                <CardHeader title={state.testInfo.title} sx={{ color: "white", backgroundColor: "#2196f3" }}
                                    action={<Timer seconds={state.remainingTimeInSeconds ?? state.testInfo.timeToCompleteInSeconds}
                                        start={state.startTimer}
                                        sx={{ fontSize: 25 }}
                                        finish={() => state.student != null && finishTest(state.student.id, state.testInfo!.testId)} />} />
                                <CardContent>
                                    {
                                        state.student != null ?
                                            <PassingTestForm student={state.student} testId={state.testInfo.testId} testItem={state.testItem} setTestItem={setTestItem} finishTest={finishTest} setStartTimer={setStartTimer} />
                                            :
                                            <StudentRegistrationForm testId={state.testInfo.testId} startTest={startTest} />
                                    }
                                </CardContent>
                            </Card>
                            : <>{state.errorMessage}</>
                    }
                </Box>
            }
        </Content >
    )
}