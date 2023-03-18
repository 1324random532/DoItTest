using DoItTest.Domain.Users;

namespace DoItTest.Site.Infrastructure;

public struct ReactApp
{
    public string Name { get; }
    public string ContainerId { get; }
    public object? Payload { get; private set; }

    public SystemUser? SystemUser { get; private set; }
    public SidebarItem[] SidebarLinksTree { get; private set; }

    public ReactApp(string name, string containerId = "app", object? playload = null)
    {
        Name = name;
        ContainerId = containerId;
        SystemUser = null;
        Payload = playload;
        SidebarLinksTree = new SidebarItem[0];
    }

    public ReactApp WithSystemUser(SystemUser systemUser)
    {
        SystemUser = systemUser;
        return this;
    }

    public ReactApp WithSidebar()
    {
        if(SystemUser is not null) SidebarLinksTree = Sidebar.GetLinksTree(SystemUser.Role);
        return this;
    }

    public ReactApp WithPayload(object payload)
    {
        Payload = payload;
        return this;
    }
}