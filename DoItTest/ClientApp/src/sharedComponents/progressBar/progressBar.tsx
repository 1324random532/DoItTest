import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';


// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 50,
//     borderRadius: 5,
//     ["&:after"]: {
//         content: '"25 / 50"',
//         fontWeight: 'bold',
//         fontSize: '1.5rem',
//         display: 'block',
//         zIndex: 15,
//         color: "#000",
//         position: 'absolute',
//         top: 'calc(50% - 13.5px)',
//         left: 'calc(50% - 33px)'
//     },
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//     },
// }));

export interface CustomizedProgressBarsProps {
    maxValue: number
    value: number
}


export default function CustomizedProgressBars(props: CustomizedProgressBarsProps) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
                variant="determinate"
                value={((props.value - 1) * 100) / props.maxValue}
                sx={{
                    height: 30,
                    borderRadius: 5,
                    color: "#00e676",
                    ["&:after"]: {
                        content: `"${props.value - 1}/${props.maxValue}"`,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        display: 'block',
                        color: "#000",
                        width: '100%',
                        position: 'absolute',
                        textAlign: 'center',
                        top: 'calc(50% - 11.35px)',
                        left: 0
                    },
                    [`&.MuiLinearProgress-colorPrimary`]: {
                        backgroundColor: "#e6e6e6",
                    },
                    [`& .MuiLinearProgress-bar`]: {
                        backgroundColor: "#81c784",
                    }
                }}
            />
        </Box>
    );
}