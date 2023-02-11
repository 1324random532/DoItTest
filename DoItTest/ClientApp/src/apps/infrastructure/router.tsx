import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { HomeLinks } from './links';

export function InfrastructureRouter() {
    return <>
        <Route path={HomeLinks.home} element={<Home />} />
    </>
}
