import { Icon } from 'sharedComponents/buttons/iconButton';
import { NeverUnreachable } from 'tools/errors/neverUnreachable';

// REFACTORING Sidebar

export enum SidebarIconType {
   Home = 1,
   Users = 2,
   Exit = 3,
   Clients = 4,
   Servers = 5,
   Projects = 6,
   Tariffs = 7,
   Versions = 8
}

interface SidebarProps {
   icon: SidebarIconType;
}
export function SidebarIcon(props: SidebarProps) {
   switch (props.icon) {
      case SidebarIconType.Home: return <Icon type='home' />
      case SidebarIconType.Users: return <Icon type='users' />
      case SidebarIconType.Exit: return <Icon type='exit' />
      case SidebarIconType.Clients: return <Icon type='suitcase' />
      case SidebarIconType.Servers: return <Icon type='servers' />
      case SidebarIconType.Projects: return <Icon type='projects' />
      case SidebarIconType.Tariffs: return <Icon type='tariffs' />
      case SidebarIconType.Versions: return <Icon type='versions' />
      default: throw new NeverUnreachable(props.icon);
   }
}
