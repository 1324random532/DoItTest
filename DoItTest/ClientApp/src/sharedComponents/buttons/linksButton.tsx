import { Button, SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'sharedComponents/tooltip/tooltip';

interface Props {
    href: string,
    title?: string,
    sx?: SxProps<Theme>
}

export function LinkButton(props: PropsWithChildren<Props>) {
    const navigateTo = useNavigate();

    return (
        <Tooltip title={props.title}>
            <Button
                variant="outlined"
                children={props.children}
                onClick={() => navigateTo(props.href)}
                sx={props.sx}
            />
        </Tooltip>
    )
}
