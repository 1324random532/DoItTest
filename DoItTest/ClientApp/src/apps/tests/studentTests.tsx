import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { screenSize } from "content/screenSize";
import { Student } from "domain/students/student";
import { StudentsProvider } from "domain/students/studentProvider";
import { StudentTest } from "domain/tests/studentTest";
import IStudentTestFilter, { makeStudentTestFilter } from "domain/tests/studentTestFilter";
import { Test } from "domain/tests/test";
import { TestsProvider } from "domain/tests/testsProvider";
import useFilter from "hooks/useFilter";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { IconButton } from "sharedComponents/buttons/iconButton";
import { Content } from "sharedComponents/content/content";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import CAsyncAutocomplete from "sharedComponents/inputs/CAsyncAutocomplete";
import { Input } from "sharedComponents/inputs/input";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import { Pagination, PaginationState } from "sharedComponents/pagination/pagination";
import { ActionTableCell } from "sharedComponents/table/actionTableCell";
import { formatFullDateTime } from "tools/DateTime";
import useComponent from "tools/components/useComponent";
import { distinct } from "tools/utils";
import { TestLinks } from "./links";
import { StudentTestsProvider } from "domain/tests/studentTestsProvider";
import CDatePickerRange from "sharedComponents/inputs/CDatePickerRange";



class State {
    constructor
        (
            public studentTests: StudentTest[] = [],
            public tests: Test[] = [],
            public testsForSearch: Test[] = [],
            public students: Student[] = [],
            public totalRows: number = 0
        ) { }
}

const defaultFilter = makeStudentTestFilter({});

export function StudentTestsList() {
    const navigateTo = useNavigate();
    const { showError, showSuccess } = useNotification()
    const blockUi = useBlockUi();
    const [state, setState] = useState<State>(new State())

    const confirmDialog = useDialog(ConfirmDialogAsync)

    const tableSize = {
        width: '90%',
        [`@media (min-width:${screenSize.lg}px)`]: {
            width: '90%'
        }
    }

    const [filter, setFilter] = useFilter(defaultFilter, (filter: IStudentTestFilter) => {
        loadStudentTestsPage(filter);
    })

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                await loadStudentTestsPage(filter);
            })
        }
    })

    async function loadStudentTestsPage(filter: IStudentTestFilter) {
        blockUi(async () => {

            const studentTestsPage = await StudentTestsProvider.getPagedStudentTest(filter);

            const testIds = distinct(studentTestsPage.values.map(v => v.testId))
            const studentIds = distinct(studentTestsPage.values.map(v => v.studentId))

            const [tests, students] = await Promise.all([
                TestsProvider.getTests(testIds),
                StudentsProvider.getStudents(studentIds)
            ])

            setState(prevState => ({ ...prevState, studentTests: studentTestsPage.values, tests, students, totalRows: studentTestsPage.totalRows }))
        })
    }

    async function remove(id: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите удалить данный тест?" })
        if (!result) return

        blockUi(async () => {
            const result = await StudentTestsProvider.removeStudentTest(id);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }
            await loadStudentTestsPage(filter)
            showSuccess("Тест студента удален")
        })
    }

    return (
        <Content withSidebar={true}>
            <h1>Тесты студентов</h1>
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                <CAsyncAutocomplete
                    options={state.testsForSearch}
                    label="Тест"
                    getOptionLabel={test => test?.title}
                    onChange={test => {
                        setFilter({ ...filter, testId: test?.id ?? null, page: 1 })
                    }}
                    onChangeText={async (text) => {
                        const testsForSearch = String.isNullOrWhitespace(text) ? [] : await TestsProvider.getTestsBySearchText(text);
                        setState(prevState => ({ ...prevState, testsForSearch }));
                    }}
                    value={state.testsForSearch.find(t => t.id == filter.testId) ?? null}
                    placeholder={"Введите название теста"}
                />

                <Input
                    type="text"
                    label="Группа"
                    value={filter.group}
                    onChange={group => setFilter({ ...filter, group, page: 1 })}
                    sx={{ width: 250 }}
                />

                <Input
                    type="text"
                    label="ФИО"
                    value={filter.studentFIO}
                    onChange={studentFIO => setFilter({ ...filter, studentFIO, page: 1 })}
                    sx={{ width: 250 }}
                />

                <CDatePickerRange
                    value={filter.dateTimePeriod}
                    onChange={dateTimePeriod => setFilter({ ...filter, dateTimePeriod, page: 1 })}
                />
            </Box>
            <TableContainer sx={tableSize} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Тест</TableCell>
                            <TableCell align='left'>Группа</TableCell>
                            <TableCell align='left'>ФИО студента</TableCell>
                            <TableCell align='center'>Процент правильных ответов</TableCell>
                            <TableCell align='center'>Оценка</TableCell>
                            <TableCell align='center'>Дата начала</TableCell>
                            <TableCell align='center'>Дата окончания</TableCell>
                            <TableCell align='left' className='compact'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.studentTests.map(st => {
                            const test = state.tests.find(t => t.id == st.testId)
                            const student = state.students.find(s => s.id == st.studentId)

                            return <TableRow
                                key={st.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left' component="th" scope="row" >{test?.title}</TableCell>
                                <TableCell align='left'>{student?.group}</TableCell>
                                <TableCell align='left' component="th" scope="row" >{student?.fullName}</TableCell>
                                <TableCell align='center'>{st.percentageOfCorrectAnswers}%</TableCell>
                                <TableCell align='center'>{st.estimation}</TableCell>
                                <TableCell align='center'>{formatFullDateTime(st.beginDateTime)}</TableCell>
                                <TableCell align='center'>{formatFullDateTime(st.endDateTime, "Не закончен")}</TableCell>
                                <ActionTableCell>
                                    <IconButton icon='delete' onClick={() => remove(st.id)} title='Удалить тест студента' />
                                    <IconButton icon='info' onClick={() => navigateTo(TestLinks.info(st.id))} title='Детализация' />
                                </ActionTableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                totalRows={state.totalRows}
                page={filter.page}
                pageSize={filter.pageSize}
                onChangePage={page => setFilter({ ...filter, page })}
                onChangePageSize={pageSize => setFilter({ ...filter, pageSize })}
            />
        </Content>
    )
}