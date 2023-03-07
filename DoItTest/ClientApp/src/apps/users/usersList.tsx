import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { screenSize } from 'content/screenSize';
import { UsersLinks } from 'apps/users/links';
import { User } from 'domain/users/user';
import { UsersProvider } from 'domain/users/usersProvider';
import { RoleType } from 'domain/users/userType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlockUi } from 'sharedComponents/blockUi/blockUiContext';
import { LinkButton } from 'sharedComponents/buttons/linksButton';
import { Content } from 'sharedComponents/content/content';
import { useNotification } from 'sharedComponents/notification/store/notificationStore';
import { Pagination, PaginationState } from 'sharedComponents/pagination/pagination';
import { ActionTableCell } from 'sharedComponents/table/actionTableCell';
import useComponent from 'tools/components/useComponent';
import { Icon, IconButton } from '../../sharedComponents/buttons/iconButton';
import useDialog from 'sharedComponents/dialog/useDialog';
import { ConfirmDialogAsync } from 'sharedComponents/dialog/dialog2';

interface ILoadUsersPageParams {
    page?: number;
    pageSize?: number;
}

export function UsersList() {

    const navigateTo = useNavigate();

    const { showError, showSuccess } = useNotification()

    const blockUi = useBlockUi();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 10, page: 1, totalRows: 0 })
    const [users, setUsers] = useState<User[]>([])

    const confirmDialog = useDialog(ConfirmDialogAsync)

    const tableSize = {
        width: '70%',
        [`@media (min-width:${screenSize.lg}px)`]: {
            width: '45%'
        }
    }

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                await loadUsersPage(pagination);
            })
        }
    })

    async function loadUsersPage({
        page = pagination.page,
        pageSize = pagination.pageSize
    }: ILoadUsersPageParams) {
        blockUi(async () => {
            const usersPage = await UsersProvider.getPagedUsers(page, pageSize);
            setUsers(usersPage.values)
            setPagination(pagination => ({ ...pagination, page, pageSize, totalRows: usersPage.totalRows }))
        })
    }

    async function changePageSize(pageSize: number) {
        await loadUsersPage({ pageSize });
    }

    async function changePage(page: number) {
        await loadUsersPage({ page });
    }

    async function remove(id: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите удалить данного пользователя?" })
        if (!result) return

        blockUi(async () => {
            const result = await UsersProvider.removeUser(id);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }
            await loadUsersPage(pagination)
            showSuccess("Пользователь удален")
        })
    }

    return (
        <Content withSidebar={true}>
            <h1>Пользователи</h1>
            <LinkButton href={UsersLinks.add} title='Добавить пользователя' sx={{ mb: 2 }}><Icon type='add' /> Добавить</LinkButton>
            <TableContainer sx={tableSize} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Логин</TableCell>
                            <TableCell align='left'>Роль</TableCell>
                            <TableCell align='left' className='compact'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow
                                key={u.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left' component="th" scope="row" >{u.login}</TableCell>
                                <TableCell align='left'>{RoleType.getDisplayName(u.role)}</TableCell>
                                <ActionTableCell>
                                    <IconButton icon='create' onClick={() => navigateTo(UsersLinks.edit(u.id))} title='Изменить пользователя' />
                                    <IconButton icon='delete' onClick={() => remove(u.id)} title='Удалить пользователя' />
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
