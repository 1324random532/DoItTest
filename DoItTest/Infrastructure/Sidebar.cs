using DoItTest.Site.Areas.Tests;
using DoItTest.Site.Areas.Users;
using static DoItTest.Site.Infrastructure.SidebarItem;

namespace DoItTest.Site.Infrastructure
{
    public static class Sidebar
    {
        private static readonly SidebarItem[] LinkItems =
        {
            ListItem("Пользователи", nameof(UsersController.App), SidebarIconType.Users),
            ListItem("Тесты", nameof(TestsController.App), SidebarIconType.Tests)
        };

        public static SidebarItem[] GetLinksTree()
        {
            return LinkItems;
        }
    }
}

