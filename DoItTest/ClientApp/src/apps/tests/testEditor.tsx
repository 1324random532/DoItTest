import { Divider, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
import AddingTestItemFromOtherTestsModal from "./components/addingTestItemFromOtherTestsModal";


export function TestEditor() {

    const routeParams = useParams();

    const { showError, showSuccess } = useNotification()
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();

    const [testBlank, setTestBlank] = useState<TestBlank>(TestBlank.getDefault)

    const [testItemBlanks, setTestItemBlanks] = useState<TestItemBlank[]>([])

    const [editItem, setEditItem] = useState<TestItemBlank | null>(null)

    const [isOpenAddingTestItemFromOtherTestsModal, setIsOpenAddingTestItemFromOtherTestsModal] = useState<boolean>(false)

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                load()
            })
        }
    })

    async function load() {
        const testId = routeParams.testId ?? null
        if (testId == null) return

        const test = await TestsProvider.getTest(testId);
        setTestBlank(TestBlank.formTest(test));

        const testItems = await TestsProvider.getTestItems(test.id);
        const testItemBlanks = TestItemBlank.formTestItems(testItems)
        setTestItemBlanks(testItemBlanks)
    }

    function setTestItemBlank(itemBlank: TestItemBlank) {
        setTestItemBlanks(prev => {
            const items = [...prev]

            const index = items.findIndex(i => i.key === itemBlank.key)

            if (index !== -1) items[index] = itemBlank
            else items.push(itemBlank)

            return items
        })
        setEditItem(null)
    }

    async function removeTestItemBlank(itemKey: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите удалить данный вопрос?" })
        if (!result) return

        const testItems = testItemBlanks
        setTestItemBlanks(testItems.filter(i => (i.key != itemKey)))
    }

    const navigateTo = useNavigate();

    async function save() {
        blockUi(async () => {
            const result = await TestsProvider.saveTest(testBlank, testItemBlanks);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            showSuccess("Сохранение выполнено")
            navigateTo(TestLinks.list, { replace: true })
        })
    }

    async function copyTest(testId: string) {
        blockUi(async () => {
            const result = await TestsProvider.copyTest(testId);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            showSuccess("Копирование выполнено")
            window.open(TestLinks.edit(result.data))
        })
    }

    async function blockPassegeTest(testId: string) {
        blockUi(async () => {
            const result = await TestsProvider.blockPassegeTest(testId);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            load()
            showSuccess("Изменение выполнено")
        })
    }

    return (
        <Content withSidebar={true}>
            <h1>{testBlank.id == null ? "Добавить" : "Изменить"}</h1>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button onClick={save} title='Сохранить именения' sx={{ mb: 2, width: 250, height: 56 }}>Сохранить</Button>

                    {
                        testBlank.id != null &&
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button onClick={() => { copyTest(testBlank.id!) }} title='Создать копию' sx={{ mb: 2, width: 250, height: 56 }}>Создать копию</Button>
                            <Button onClick={() => { blockPassegeTest(testBlank.id!) }} title={testBlank.blockPassage ? "Разблокировать доступ" : "Заблокировать доступ"} sx={{ mb: 2, width: 250, height: 56 }}>{testBlank.blockPassage ? "Разблокировать доступ" : "Заблокировать доступ"}</Button>
                        </Box>
                    }

                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Input
                        type="text"
                        label="Название теста"
                        value={testBlank.title}
                        onChange={title => setTestBlank({ ...testBlank, title })}
                        sx={{ width: 250 }}
                    />
                    <Input
                        type="time"
                        label="Время прохождения"
                        value={getTime(testBlank.timeToCompleteInSeconds)}
                        onChange={timeToComplete => setTestBlank({ ...testBlank, timeToCompleteInSeconds: timeToComplete?.getTotalSeconds() ?? null })}
                        sx={{ width: 130 }}
                    />
                </Box>
                <Paper>
                    <Box sx={{ textAlign: "center", fontSize: 20, padding: 2 }}> Количестов процентов на оценку</Box>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>5</TableCell>
                                    <TableCell align='center'>4</TableCell>
                                    <TableCell align='center'>3</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align='center' component="th" scope="row">
                                        <Input
                                            type='number'
                                            label=""
                                            value={testBlank.numberOfPercentagesByFive}
                                            onChange={numberOfPercentagesByFive => setTestBlank({ ...testBlank, numberOfPercentagesByFive })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                            sx={{ width: 100 }}
                                            size="small"
                                            onlyWhole
                                            onlyPositive
                                            maxValue={100}
                                        />
                                    </TableCell>

                                    <TableCell align='center' component="th" scope="row">
                                        <Input
                                            type='number'
                                            label=""
                                            value={testBlank.numberOfPercentagesByFour}
                                            onChange={numberOfPercentagesByFour => setTestBlank({ ...testBlank, numberOfPercentagesByFour })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                            sx={{ width: 100 }}
                                            size="small"
                                            onlyWhole
                                            onlyPositive
                                            maxValue={100}
                                        />
                                    </TableCell>

                                    <TableCell align='center' component="th" scope="row" >
                                        <Input
                                            type='number'
                                            label=""
                                            value={testBlank.numberOfPercentagesByThree}
                                            onChange={numberOfPercentagesByThree => setTestBlank({ ...testBlank, numberOfPercentagesByThree })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                            sx={{ width: 100 }}
                                            size="small"
                                            onlyWhole
                                            onlyPositive
                                            maxValue={100}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        title="Добавить вопрос"
                        onClick={() => { setEditItem(TestItemBlank.getDefault()) }}
                        sx={{ mb: 2, width: 250, height: 56 }}
                    >
                        Добавить вопрос
                    </Button>

                    <Button
                        title="Импортировать вопросы"
                        onClick={() => setIsOpenAddingTestItemFromOtherTestsModal(true)}
                        sx={{ mb: 2, width: 250, height: 56 }}
                    >
                        Импортировать вопросы
                    </Button>
                </Box>
                {editItem !== null && <TestItemEditorModal
                    changeTestItemBlank={setTestItemBlank}
                    testItem={editItem}
                    open={true}
                    onClose={() => {
                        setEditItem(null)
                    }}
                />}
                <AddingTestItemFromOtherTestsModal
                    open={isOpenAddingTestItemFromOtherTestsModal}
                    currentTestItemBlanks={testItemBlanks}
                    changeCurrentTestItemBlanks={setTestItemBlanks}
                    onClose={() => setIsOpenAddingTestItemFromOtherTestsModal(false)}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {testItemBlanks.map((i, index) => {
                        return <TestItemCard item={i} index={index + 1} removeItem={removeTestItemBlank} changeItem={() => setEditItem(i)} sx={{ width: 600 }} />
                    })}
                </Box>
            </Box>
        </Content>
    )
}

