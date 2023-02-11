import { createContext, FC, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { Notification } from '../notification'
import { NotificationType } from '../notificationType'

export interface Action<Type, Payload> {
    type: Type,
    payload: Payload
}

//#region Actions

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'

interface ShowNotification extends Action<typeof SHOW_NOTIFICATION, Notification> { }
type NotificationAction = ShowNotification

//#endregion

//#region ActionCreators

export const showNotification = (notification: Notification): ShowNotification =>
    ({ type: SHOW_NOTIFICATION, payload: notification })

//#endregion

//#region Store

type State = {
    notification: Notification | null
}

type Dispatch = (action: NotificationAction) => void

function reducer(state: State, action: NotificationAction): State {

    switch (action.type) {
        case SHOW_NOTIFICATION: return { ...state, notification: action.payload }
        default: throw `Unhandled action type`
    }
}

const defaultState: State = {
    notification: null
}

////#endregion

//#region Context

const NotificationStateContext = createContext<State>(defaultState)
const NotificationDispatchContext = createContext<Dispatch | null>(null)

const NotificationProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, defaultState)

    return (
        <NotificationStateContext.Provider value={state}>
            <NotificationDispatchContext.Provider value={dispatch}>
                {children}
            </NotificationDispatchContext.Provider>
        </NotificationStateContext.Provider>
    )
}


const useNotificationState = () => {
    return useContext(NotificationStateContext)
}

const useNotificationDispatch = () => {

    const context = useContext(NotificationDispatchContext)

    if (context === null)
        throw 'useAppDispatch must be used within a AppProvider'

    return context
}

const useNotification = () => {
    const dispatch = useNotificationDispatch()

    const showSuccess = (value: string) => {
        dispatch(showNotification({ type: NotificationType.Success, message: value }))
    }

    const showWarning = (value: string) => {
        dispatch(showNotification({ type: NotificationType.Warning, message: value }))
    }

    const showError = (value: string | Error) => {
        const message = value instanceof Error ? value.message : value
        dispatch(showNotification({ type: NotificationType.Error, message: message }))
    }

    const notificationActions = useMemo(() => ({ showSuccess, showWarning, showError }), [])

    return notificationActions
}


//#endregion

export { NotificationProvider, useNotificationState, useNotification }
