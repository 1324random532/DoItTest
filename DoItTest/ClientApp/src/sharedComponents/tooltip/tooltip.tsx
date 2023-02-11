import { Tooltip as MaterialTooltip } from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';

export interface TooltipProps {
    title?: string;
}

export function Tooltip(props: PropsWithChildren<TooltipProps>) {
    const title = props.title == undefined ? "" : props.title

    return (
        <MaterialTooltip title={title} arrow>
            {props.children as ReactElement}
        </MaterialTooltip>
    )
}
