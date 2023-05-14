import { Card, CardContent, CardHeader, Divider, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import { TestBlank } from "domain/tests/testBlank";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { TestsProvider } from "domain/tests/testsProvider";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { Button } from "sharedComponents/buttons/button";
import { Content } from "sharedComponents/content/content";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { Input } from "sharedComponents/inputs/input";
import TimePicker from "sharedComponents/inputs/timeInput";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import useComponent from "tools/components/useComponent";
import Time, { getTime } from "tools/time";
import { TestItemCard } from "./components/infos/testItemInfoCard";
import TestItemEditorModal from "./components/testItemEditorModal";
import { TestLinks } from "./links";
import { StudentTest } from "domain/tests/studentTest";
import { StudentsProvider } from "domain/students/studentProvider";
import { Test } from "domain/tests/test";
import { Student } from "domain/students/student";
import { TestItem } from "domain/tests/items/testItem";
import { formatFullDateTime } from "tools/DateTime";
import { PassingTestItemInfoCard } from "./components/passingInfos/passingTestItemInfoCard";
import { AnswerProvider } from "domain/answers/answerProvider";
import { Answer } from "domain/answers/answer";
import { StudentTestsProvider } from "domain/tests/studentTestsProvider";

class State {
    constructor
        (
            public studentTest: StudentTest | null = null,
            public test: Test | null = null,
            public student: Student | null = null,
            public testItems: TestItem[] = [],
            public answers: Answer[] = []
        ) { }
}

export function StudentTestInfo() {

    const routeParams = useParams();

    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();
    const { showError, showSuccess } = useNotification()

    const [state, setState] = useState<State>(new State())


    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const studentTestId = routeParams.studentTestId ?? null
                if (studentTestId == null) return showError("Тест студента не найден");

                const studentTest = await StudentTestsProvider.getStudentTest(studentTestId);
                if (studentTest == null) return showError("Тест студента не найден");

                const [test, student] = await Promise.all([
                    TestsProvider.getTest(studentTest.testId),
                    StudentsProvider.getStudent(studentTest.studentId)
                ])
                if (test == null) return showError("Тест не найден");
                if (student == null) return showError("Студент не найден");

                const [testItems, answers] = await Promise.all([
                    TestsProvider.getTestItems(test.id),
                    await AnswerProvider.getAnswers(studentTest.id)
                ])

                setState({ ...state, studentTest, test, student, testItems, answers })
            })
        }
    })

    return (
        <Content withSidebar={true}>
            {
                state.studentTest != null && state.student != null && state.test != null &&
                <>
                    <h1>Результат прохождения теста</h1>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Card>
                            <CardHeader title={"Иформация о студенте"} />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography>Имя: {state.student.firstName}</Typography>
                                <Typography>Фамилия: {state.student.lastName}</Typography>
                                <Typography>{state.student.patronymic && `Отчество: ${state.student.patronymic}`}</Typography>
                                <Typography>Группа: {state.student.group}</Typography>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader title="Ифнормация по прохождению" />
                            <CardContent>
                                <Typography>Тест: {state.test.title}</Typography>
                                <Typography>Затраченное время: {state.studentTest.spentTime?.getTimeString() ?? "Не закончен"} </Typography>
                                <Typography>Процент правильных ответов: {state.studentTest.percentageOfCorrectAnswers}%</Typography>
                                <Typography>Оценка: {state.studentTest.estimation}</Typography>
                                <Typography>Дата начала: {formatFullDateTime(state.studentTest.beginDateTime)} </Typography>
                                <Typography>Дата окончания: {formatFullDateTime(state.studentTest.endDateTime, "Не закончен")} </Typography>
                            </CardContent>
                        </Card>

                        <h2>Детализация ответов</h2>
                        {
                            state.testItems.map((i, index) => {
                                const answer = state.answers.find(a => a.testItemId == i.id) ?? null
                                return <PassingTestItemInfoCard item={i} answer={answer} index={index + 1} />
                            }
                            )
                        }
                    </Box>
                </>
            }
        </Content>
    )
}

