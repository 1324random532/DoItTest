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
import { AnswerBlank } from "domain/answers/answerBlank";
import { PassingTestItemCard } from "./passingTsetItems/passingTestItemCard";
import { PassingTestForm } from "./passingTestForm";
import { Student } from "domain/students/student";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { TestInfo } from "domain/tests/testInfo";
import { TestsProvider } from "domain/tests/testsProvider";
import Timer from "sharedComponents/timer/timer";
import { getCookie } from "tools/Cookie";
import { StudentsProvider } from "domain/students/studentProvider";


export function PassingTest() {

    const routeParams = useParams();

    const { showError, showSuccess } = useNotification()

    const blockUi = useBlockUi();

    const [student, setStudent] = useState<Student | null>(null)
    const [testInfo, setTestInfo] = useState<TestInfo | null>(null)

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const testInfo = await TestsProvider.getTestInfo(routeParams.testId!)
                if (testInfo == null) return showError("Информация по тесту отсутсвует")

                setTestInfo(testInfo)

                const studentId = getCookie("studentId")
                if (String.isNullOrWhitespace(studentId)) return;

                const student = await StudentsProvider.getStudent(studentId);
                setStudent(student)
            })
        }
    })


    return (
        <Content withSidebar={false}>
            <Box sx={{ paddingTop: "5%" }}>
                {
                    testInfo != null ?
                        <Card sx={{ width: "600px" }}>
                            <CardHeader title={testInfo.title} sx={{ color: "white", backgroundColor: "#2196f3" }} action={<Timer seconds={testInfo!.timeToCompleteInSeconds} start={false} sx={{ fontSize: 25 }} />} />
                            <CardContent>
                                {
                                    student != null ?
                                        <PassingTestForm student={student} testId={testInfo.testId} />
                                        :
                                        <StudentRegistrationForm testId={testInfo.testId} setStudent={setStudent} />
                                }

                            </CardContent>
                        </Card>
                        : <>Тест не найден, проверте ссылку</>
                }
            </Box>
        </Content >
    )
}