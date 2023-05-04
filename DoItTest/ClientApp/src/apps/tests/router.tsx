import { Route } from 'react-router-dom'
import { TestLinks } from './links'
import { TestEditor } from './testEditor'
import { TestsList } from './testList'
import { PassingTest } from './passingTests/passingTest'

export function TestRouter() {
    return <>
        <Route path={TestLinks.list} element={<TestsList />} />
        <Route path={TestLinks.add} element={<TestEditor />} />
        <Route path={TestLinks.editTemplate} element={<TestEditor />} />
        <Route path={TestLinks.passingTemplate} element={<PassingTest />}/>
    </>
}
