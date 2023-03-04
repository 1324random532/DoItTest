import { useContext, useEffect, useRef } from "react"
import DialogContext from './dialogContext'
import { DialogComponent } from './types'

function useDialog<D, R>(component: DialogComponent<D, R>) {

    const idRef = useRef<string>()

    const ctx = useContext(DialogContext)

    useEffect(() => {
        idRef.current = ctx.register(component)
        return () => { if (idRef.current) ctx.unregister(idRef.current) }
    }, [])

    const show = async (data: D): Promise<R> => {
        if (idRef.current) {
            return ctx.show(idRef.current, data)
        } else {
            throw new Error("No dialog component registered")
        }
    }

    const hide = () => {
        if (idRef.current) {
            return ctx.hide(idRef.current)
        } else {
            throw new Error("No dialog component registered")
        }
    }

    return {
        show,
        hide
    }
}

export default useDialog