import { Icon } from 'sharedComponents/buttons/iconButton';
import { NeverUnreachable } from 'tools/errors/neverUnreachable';

// REFACTORING Sidebar

export enum SidebarIconType {
   Home = 1,
   Users = 2,
   Tests = 3,
   StudentTests = 4,
   Exit = 5,
}

interface SidebarProps {
   icon: SidebarIconType;
}
export function SidebarIcon(props: SidebarProps) {
   switch (props.icon) {
      case SidebarIconType.Home: return <Icon type='home' />
      case SidebarIconType.Users: return <Icon type='users' />
      case SidebarIconType.Tests: return <Icon type='tests' />
      case SidebarIconType.StudentTests: return <Icon type='studentTests' />
      case SidebarIconType.Exit: return <Icon type='exit' />
      default: throw new NeverUnreachable(props.icon);
   }
}
