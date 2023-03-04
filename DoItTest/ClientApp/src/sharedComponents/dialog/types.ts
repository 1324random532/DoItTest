import { ComponentType } from "react"

export interface AsyncDialogProps<Request = void, Response = undefined> {
    isOpen: boolean
    onClose: (data?: Response) => void
    data: Request
}

export type DialogComponent<D, R> = ComponentType<AsyncDialogProps<D, R>>