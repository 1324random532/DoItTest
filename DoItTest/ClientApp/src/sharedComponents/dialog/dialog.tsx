import { Button, Dialog as MaterialDialog, DialogActions, DialogContent, DialogTitle, SxProps, Theme } from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface DialogProps {
    onClose: () => void;
    isOpen: boolean
    title?: string;
    actionsContent?: JSX.Element;
    defaultChecked?: boolean;
    sx?: SxProps<Theme>;
}

export default function Dialog(props: PropsWithChildren<DialogProps>) {

    return (
        <MaterialDialog
            open={props.isOpen}
            onClose={props.onClose}
            sx={props.sx}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.actionsContent ?? <Button onClick={props.onClose}>Закрыть</Button>}
            </DialogActions>
        </MaterialDialog>
    );
}
