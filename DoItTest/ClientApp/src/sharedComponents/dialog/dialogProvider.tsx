import React, { PropsWithChildren, useRef } from 'react'
import DialogContext, { DialogContextState } from './dialogContext'
import { DialogComponent } from './types'

interface DialogStateItem {
    component: DialogComponent<unknown, unknown>
    isOpen: boolean
    data?: unknown
    resolve?: (value: unknown) => void
}

function DialogProvider({ children }: PropsWithChildren<{}>) {
    const [dialogs, setDialogs] = React.useState<{ [key: string]: DialogStateItem }>({})
    const idRef = useRef(0)

    const ctx: DialogContextState = {
        /**
         * Registers a new dialog component and returns the assigned id of that dialog
         * @param component The component to use
         * @returns the id of the dialog
         */
        register: (component: DialogComponent<unknown, unknown>): string => {
            const dialog: DialogStateItem = {
                component,
                isOpen: false,
            }

            const componentId = idRef.current
            idRef.current++
            setDialogs((d) => ({ ...d, [componentId]: dialog }))
            return String(componentId)
        },

        /**
         * Removes a registerd dialog given its id
         * @param dialogId the id of the dialog
         */
        unregister: (dialogId: string): void => {
            setDialogs(({ [dialogId]: _, ...d }) => d)
        },
        /**
         * Show the dialog with the given id, and optionally pass in some data. If the dialog is already open, this will just update the data
         * @param dialogId the id of the dialog
         * @param data data to pass to the dialog component
         */
        show: (dialogId: string, data: unknown): Promise<unknown> => {
            return new Promise((resolve) => {
                setDialogs((d) => ({ ...d, [dialogId]: { ...d[dialogId], data, isOpen: true, resolve } }))
            })
        },
        /**
         * Force closes the dialog with the given id
         * @param dialogId the id of the dialog
         */
        hide: (dialogId: string): void => {
            setDialogs((d) => ({ ...d, [dialogId]: { ...d[dialogId], isOpen: false } }))
        },

        /**
         * Updates the data of the given dialog
         * @param dialogId the id of the dialog to update
         * @param data the new data to pass to the dialog
         */
        updateData: (dialogId: string, data: unknown): void => {
            setDialogs((d) => ({ ...d, [dialogId]: { ...d[dialogId], data } }))
        },
    }

    return (
        <>
            <DialogContext.Provider value={ctx}>
                {children}
                {Object.entries(dialogs).map(([id, { component: C, isOpen, data, resolve }]) => {
                    if (resolve) {
                        const onClose = (value: unknown) => {
                            ctx.hide(id)
                            resolve(value)
                        }
                        return <C key={id} isOpen={isOpen} onClose={onClose} data={data} />
                    } else {
                        return
                    }
                })}
            </DialogContext.Provider>
        </>
    )
}

export default DialogProvider
