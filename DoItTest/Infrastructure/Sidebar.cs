using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Tests;
using DoItTest.Site.Areas.Users;
using static DoItTest.Site.Infrastructure.SidebarItem;

namespace DoItTest.Site.Infrastructure
{
    public static class Sidebar
    {
        private static readonly SidebarItem[] TestCreatorLinkItems =
        {
            ListItem("Тесты", nameof(TestsController.App), SidebarIconType.Tests),
            ListItem("Тесты студентов", nameof(StudentTestsController.App), SidebarIconType.StudentTests)
        };

        private static readonly SidebarItem[] SuperLinkItems =
        {
            ListItem("Пользователи", nameof(UsersController.App), SidebarIconType.Users),
            ListItem("Тесты", nameof(TestsController.App), SidebarIconType.Tests),
            ListItem("Тесты студентов", nameof(StudentTestsController.App), SidebarIconType.StudentTests)
        };

        public static SidebarItem[] GetLinksTree(UserRole role)
        {
            switch (role)
            {
                case UserRole.Super:
                    return SuperLinkItems;
                case UserRole.TestCreator:
                    return TestCreatorLinkItems;
                default: throw new Exception("Не известный тип пользователя");
            }
        }
    }
}

