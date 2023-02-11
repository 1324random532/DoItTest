import { SidebarIconType } from './sidebarIcon';

export class SidebarItem {

    constructor(
        public text: string,
        public url: string,
        public icon: SidebarIconType,
        public innerItems: SidebarItem[]
    ) {
    }
}

export function mapToSidebarItem(data: any): SidebarItem {
    const innerItems = data.innerItems ? (data.innerItems as any[]).map(i => mapToSidebarItem(i)) : [];
    return new SidebarItem(data.text, data.url, data.icon, innerItems);
}
export function mapToSidebarItems(value: any[]): SidebarItem[] {
    return value.map(mapToSidebarItem);
}
