import { Add, Create, Home } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BadgeIcon from '@mui/icons-material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import RouterIcon from '@mui/icons-material/Router';
import WestIcon from '@mui/icons-material/West';
import WorkIcon from '@mui/icons-material/Work';
import { IconButton as MaterialIconButton, SxProps, Theme } from '@mui/material';
import { Tooltip } from 'sharedComponents/tooltip/tooltip';
import { NeverUnreachable } from 'tools/errors/neverUnreachable';

type IconType = 'delete' | 'create' | 'add' | 'home' | 'users' | 'exit' | 'menu' | 'chevronLeft' | 'door' | 'suitcase' | 'servers' | 'projects' | 'tariffs' | 'versions'
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
        case 'suitcase': return <BadgeIcon />
        case 'servers': return <RouterIcon />
        case 'projects': return <WorkIcon />
        case 'tariffs': return <MonetizationOnIcon />
        case 'versions': return <AppRegistrationIcon />
        default: throw new NeverUnreachable(props.type);
    }
}
