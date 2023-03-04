import { Authorization } from 'apps/authorization/auth'
import { Route } from 'react-router-dom'
import { TestLinks } from './links'
import { TestEditor } from './testEditor'

export function TestRouter() {
    return <>
        <Route path={TestLinks.list} element={<></>} />
        <Route path={TestLinks.add} element={<TestEditor />} />
        <Route path={TestLinks.editTemplate} element={<TestEditor />} />
    </>
}
