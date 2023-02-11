using DoItTest.Domain.Users;
using DoItTest.Site.Infrastructure;
using DoItTest.Site.Infrastructure.Filters;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Bases;

[IsAuthorized]
public class BaseController : Controller
{
    protected SystemUser SystemUser => (SystemUser?)HttpContext?.Items[IsAuthorizedAttribute.SystemUserContextItemName]!;

    public string Host => $"{Request.Scheme}://{Request.Host}";
    public RedirectResult HomePage => Redirect("/");

    public ViewResult ReactApp(string appName = "app", bool withSystemUser = true, bool withSidebar = true, object? playload = null)
    {
        ReactApp app = new(appName);

        if (withSystemUser) app.WithSystemUser(SystemUser);
        if (withSidebar) app.WithSidebar();
        if (playload is not null) app.WithPayload(playload);

        return View("ReactApp", app);
    }
}