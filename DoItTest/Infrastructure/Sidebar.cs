using DoItTest.Site.Areas;
using FKM.BackOffice.Areas.Infrastructures;
using static DoItTest.Site.Infrastructure.SidebarItem;

namespace DoItTest.Site.Infrastructure
{
    public static class Sidebar
    {
        private static readonly SidebarItem[] LinkItems =
        {
            //ListItem("Пользователи", nameof(UsersController.App), SidebarIconType.Users),
        };

        public static SidebarItem[] GetLinksTree()
        {
            return LinkItems;
        }
    }
}

