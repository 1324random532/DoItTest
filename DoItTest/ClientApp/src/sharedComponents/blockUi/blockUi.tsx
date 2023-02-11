import { Backdrop, CircularProgress } from '@mui/material'
import { FC } from 'react'
import { useBlockUiState } from './blockUiContext'

export const BlockUi: FC<{}> = () => {
    const { blockCount } = useBlockUiState()

    return (<>
        <Backdrop sx={{ zIndex: 999999 }} open={blockCount != 0}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </>)
}
