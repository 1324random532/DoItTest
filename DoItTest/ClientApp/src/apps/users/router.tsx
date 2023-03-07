import { UsersLinks } from 'apps/users/links'
import { Route, Routes } from 'react-router-dom'
import { UserEditor } from './usersEditor'
import { UsersList } from './usersList'

export function UsersRouter() {
    return <>
        <Route path={UsersLinks.list} element={<UsersList />} />
        <Route path={UsersLinks.add} element={<UserEditor />} />
        <Route path={UsersLinks.editTemplate} element={<UserEditor />} />
    </>
}
