
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material'
import { FC, useEffect, useMemo, useState } from "react"
import { NotificationType } from './notificationType'
import { useNotificationState } from './store/notificationStore'


interface Props {

}

export const NotificationManager: FC<Props> = () => {

    const { notification } = useNotificationState()

    const [open, setOpen] = useState<boolean>(false)

    // const classes = useStyles()

    function onClose() {
        setOpen(false)
    }

    useEffect(() => {
        if (notification != null)
            setOpen(true)
    }, [notification])

    const anchorOrigin = useMemo<SnackbarOrigin>(() => {
        return { vertical: "top", horizontal: "right" }
    }, [])

    function getSeverity() {
        switch (notification?.type) {
            case NotificationType.Success:
                return "success";
            case NotificationType.Warning:
                return "warning";
            case NotificationType.Error:
                return "error"
            default: return undefined
        }
    }

    return (

        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={onClose}
                severity={getSeverity()}
            >
                {notification && notification.message}
            </Alert>
        </Snackbar>

    )
}
