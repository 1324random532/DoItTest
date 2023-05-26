import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { screenSize } from "content/screenSize";
import { Test } from "domain/tests/test";
import { TestsProvider } from "domain/tests/testsProvider";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { Icon, IconButton } from "sharedComponents/buttons/iconButton";
import { LinkButton } from "sharedComponents/buttons/linksButton";
import { Content } from "sharedComponents/content/content";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import { Pagination, PaginationState } from "sharedComponents/pagination/pagination";
import { ActionTableCell } from "sharedComponents/table/actionTableCell";
import useComponent from "tools/components/useComponent";
import { TestLinks } from "./links";
import ITestsFilter, { makeTestsFilter } from "domain/tests/ITestsFilter";
import useFilter from "hooks/useFilter";
import { Input } from "sharedComponents/inputs/input";


class State {
    constructor
        (
            public tests: Test[] = [],
            public totalRows: number = 0
        ) { }
}

const defaultFilter = makeTestsFilter({});

export function TestsList() {

    const routeParams = useParams();
    const navigateTo = useNavigate();
    const { showError, showSuccess } = useNotification()
    const blockUi = useBlockUi();
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const [state, setState] = useState<State>(new State())

    const tableSize = {
        width: '70%',
        [`@media (min-width:${screenSize.lg}px)`]: {
            width: '50%'
        }
    }

    const [filter, setFilter] = useFilter(defaultFilter, (filter: ITestsFilter) => {
        loadTestsPage(filter);
    })

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                await loadTestsPage(filter);
            })
        }
    })

    async function loadTestsPage(filter: ITestsFilter) {
        blockUi(async () => {

            const testsPage = await TestsProvider.getPagedTests(filter);

            setState({ ...state, tests: testsPage.values, totalRows: testsPage.totalRows })
        })
    }

    async function remove(id: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите удалить данный тест?" })
        if (!result) return

        blockUi(async () => {
            const result = await TestsProvider.removeTest(id);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }
            await loadTestsPage(filter)
            showSuccess("Тест удален")
        })
    }

    return (
        <Content withSidebar={true}>
            <h1>Тесты</h1>

            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                <LinkButton href={TestLinks.add} title='Добавить тест' sx={{ mb: 2, height: 55, width: 222 }}><Icon type='add' /> Добавить</LinkButton>
                <Input
                    type="text"
                    label="Название"
                    value={filter.title}
                    onChange={title => setFilter({ ...filter, title })}
                />
            </Box>
            <TableContainer sx={tableSize} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Название</TableCell>
                            <TableCell align='left' className='compact'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.tests.map((t) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left' component="th" scope="row" >{t.title}</TableCell>
                                <ActionTableCell>
                                    <IconButton icon='delete' onClick={() => remove(t.id)} title='Удалить тест' />
                                    <IconButton icon='create' onClick={() => navigateTo(TestLinks.edit(t.id))} title='Изменить тест' />
                                    <IconButton
                                        icon='copy'
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${location.origin}${TestLinks.passing(t.id)}`)
                                        }}
                                        disabled={t.blockPassage}
                                        title="Скопировать ссылку"
                                    />
                                </ActionTableCell>
                            </TableRow>
                        ))}
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