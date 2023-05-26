import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import Sidebar from 'sharedComponents/sidebar/sidebar';

export function Content(props: PropsWithChildren<{ withSidebar: Boolean, backGroundColor?: string }>) {
    return (
        props.withSidebar
            ? <Sidebar>
                <Box sx={{ m: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: props.backGroundColor }}>
                    {props.children}
                </Box>
            </Sidebar>
            :
            <Box sx={{ height: '100%', m: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: props.backGroundColor }}>
                {props.children}
            </Box>
    )
}