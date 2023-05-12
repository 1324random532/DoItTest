import CloseIcon from "@mui/icons-material/Close"
import { memo } from 'react'


const ClearIcon = memo(function (): JSX.Element {
    return (<CloseIcon sx={{
        fontSize: '1.125rem'
    }} />)
})

export default ClearIcon