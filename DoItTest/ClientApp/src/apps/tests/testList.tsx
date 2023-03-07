import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
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

interface ILoadTestsPageParams {
    page?: number;
    pageSize?: number;
}

export function TestsList() {

    const routeParams = useParams();
    const navigateTo = useNavigate();
    const { showError, showSuccess } = useNotification()
    const blockUi = useBlockUi();
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 10, page: 1, totalRows: 0 })
    const [tests, setTests] = useState<Test[]>([])

    const tableSize = {
        width: '70%',
        [`@media (min-width:${screenSize.lg}px)`]: {
            width: '50%'
        }
    }

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                await loadTestsPage(pagination);
            })
        }
    })

    async function loadTestsPage({
        page = pagination.page,
        pageSize = pagination.pageSize
    }: ILoadTestsPageParams) {
        blockUi(async () => {

            const testsPage = await TestsProvider.getPagedTests(page, pageSize);

            setTests(testsPage.values)
            setPagination(pagination => ({ ...pagination, page, pageSize, totalRows: testsPage.totalRows }))
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
            await loadTestsPage(pagination)
            showSuccess("Проект удален")
        })
    }

    async function changePageSize(pageSize: number) {
        await loadTestsPage({ pageSize });
    }

    async function changePage(page: number) {
        await loadTestsPage({ page });
    }

    return (
        <Content withSidebar={true}>
            <h1>Тесты</h1>
            <LinkButton href={TestLinks.add} title='Добавить тест' sx={{ mb: 2 }}><Icon type='add' /> Добавить</LinkButton>
            <TableContainer sx={tableSize} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Название</TableCell>
                            <TableCell align='left' className='compact'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((t) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left' component="th" scope="row" >{t.title}</TableCell>
                                <ActionTableCell>
                                    <IconButton icon='create' onClick={() => navigateTo(TestLinks.edit(t.id))} title='Изменить тест' />
                                    <IconButton icon='delete' onClick={() => remove(t.id)} title='Удалить тест' />
                                </ActionTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                totalRows={pagination.totalRows}
                page={pagination.page}
                pageSize={pagination.pageSize}
                onChangePage={changePage}
                onChangePageSize={changePageSize}
            />
        </Content>
    )
}