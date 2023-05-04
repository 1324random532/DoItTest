import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import Sidebar from 'sharedComponents/sidebar/sidebar';

export function Content(props: PropsWithChildren<{ withSidebar: Boolean }>) {
    return (
        props.withSidebar
            ? <Sidebar>
                <Box sx={{ m: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {props.children}
                </Box>
            </Sidebar>
            :
            <Box sx={{ height: '100%', m: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {props.children}
            </Box>
    )
}