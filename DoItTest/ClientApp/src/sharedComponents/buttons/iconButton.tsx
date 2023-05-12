import { Add, Create, Home } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import WestIcon from '@mui/icons-material/West';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton as MaterialIconButton, SxProps, Theme } from '@mui/material';
import { Tooltip } from 'sharedComponents/tooltip/tooltip';
import { NeverUnreachable } from 'tools/errors/neverUnreachable';
import CloseIcon from '@mui/icons-material/Close';

type IconType = 'delete' | 'create' | 'add' | 'home' | 'users' | 'exit' | 'menu' | 'chevronLeft' | 'door' | 'tests' | 'cross' | 'studentTests' | 'copy'
interface IconProps {
    icon: IconType
    onClick?: () => void
    title?: string
    size?: 'small' | 'medium' | 'large'
    sx?: SxProps<Theme>
    children?: string
}

export function IconButton(props: IconProps) {
    return <Tooltip title={props.title}>
        <MaterialIconButton onClick={props.onClick} sx={props.sx} size={props.size}>
            <Icon type={props.icon}></Icon>
        </MaterialIconButton>
    </Tooltip>
}

export function Icon(props: { type: IconType }) {
    switch (props.type) {
        case 'delete': return <DeleteIcon />
        case 'create': return <Create />
        case 'add': return <Add />
        case 'home': return <Home />
        case 'users': return <PeopleIcon />
        case 'exit': return <WestIcon />
        case 'menu': return <MenuIcon />
        case 'chevronLeft': return <ChevronLeftIcon />
        case 'door': return <MeetingRoomIcon />
        case 'tests': return <AssignmentLateIcon />
        case 'cross': return <CloseIcon />
        case 'studentTests': return <AssignmentTurnedInIcon />
        case 'copy': return <ContentCopyIcon />
        default: throw new NeverUnreachable(props.type);
    }
}
