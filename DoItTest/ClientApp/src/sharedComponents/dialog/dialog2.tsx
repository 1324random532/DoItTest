import { Button, DialogActions } from "@mui/material"
import { Box } from "@mui/system"
import Dialog from "./dialog"
import { AsyncDialogProps } from "./types"

interface Props {
    title: string
    description?: string
}

export function ConfirmDialogAsync(dialogProps: AsyncDialogProps<Props, boolean>) {

    const props = dialogProps.data

    return (
        <Dialog {...dialogProps} title="" onClose={() => { }}>
            <Box textAlign={"center"} fontSize="1.3rem" fontWeight={500}>{props.title}</Box>
            {props.description && <Box mt={1} color="rgba(0, 0, 0, 0.6)" fontSize="1.1rem">{props.description}</Box>}

            <Box mt={2}>
                <DialogActions>
                    <Button onClick={() => dialogProps.onClose(false)} color="primary">No</Button>
                    <Button variant="contained" onClick={() => dialogProps.onClose(true)} color="primary">Yes</Button>
                </DialogActions>
            </Box>

        </Dialog>
    )
}