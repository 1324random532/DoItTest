import { useRef, useEffect } from "react"

export default function useDebounced(func: ((...args: any) => void), delay: number)
{
    const timeoutRef = useRef<number | null>(null)

    function clearTimer() 
    {
        if (timeoutRef.current)
        {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    useEffect(() =>
    {
        return () =>
        {
            clearTimer()
        }
    }, [])

    return (...args: any) =>
    {
        clearTimer()
        timeoutRef.current = window.setTimeout(() => func(...args), delay)
    }
}