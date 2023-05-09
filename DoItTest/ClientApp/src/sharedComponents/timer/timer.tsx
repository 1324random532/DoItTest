import { Box, SxProps, Theme } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import useComponent from 'tools/components/useComponent';
import Time from 'tools/time';

export interface TimerProps {
    seconds: number
    start: boolean
    finish?: () => void
    sx?: SxProps<Theme>
}

const Timer = (props: TimerProps) => {
    const [time, setTime] = useState<Time>(new Time(props.seconds))
    const [stringTime, setStringTime] = useState<string>(time.getTimeString())

    useEffect(() => {
        if (!props.start) return;

        const timer = window.setInterval(() => {
            time.takeSecond()
            setTime(time)
            setStringTime(time.getTimeString())
        }, 1000)

        if (time.getTotalSeconds() == 0) {
            window.clearInterval(timer)
            props.finish && props.finish()
        }

        return () => {
            window.clearInterval(timer)
        }
    }, [props.start])

    return (
        <Box sx={props.sx}>{stringTime}</Box>
    )
}

export default Timer;