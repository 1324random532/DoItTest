import { TableCell } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props {
}

export function ActionTableCell(props: PropsWithChildren<Props>) {
    return (
        <TableCell
            children={props.children}
            sx={{ display:'flex' }}
        />
    )
}
