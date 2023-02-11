import { Authorization } from 'apps/authorization/auth'
import { Route } from 'react-router-dom'
import { AuthLinks } from './links'

export function AuthRouter() {
    return <>
        <Route path={AuthLinks.authorization} element={<Authorization />} />
    </>
}
