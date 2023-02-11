import { Button as MaterialButton, ButtonPropsVariantOverrides, SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Tooltip } from 'sharedComponents/tooltip/tooltip';

interface Props {
    onClick: () => void,
    title?: string,
    sx?: SxProps<Theme>
    variant?: 'text' | 'outlined' | 'contained',
}

export function Button(props: PropsWithChildren<Props>) {

    return (
        <Tooltip title={props.title}>
            <MaterialButton
                children={props.children}
                variant={props.variant ?? "outlined"}
                onClick={() => props.onClick()}
                sx={props.sx}
            />
        </Tooltip>
    )
}
