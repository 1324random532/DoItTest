using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Tools.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace DoItTest.Site.Infrastructure.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    internal class IsAuthorizedAttribute : ActionFilterAttribute
    {
        public static readonly string CookieName = "auth";
        public const string SystemUserContextItemName = "SystemUser";

        public Boolean OnlySuperUser { get; }

        public IsAuthorizedAttribute(){
            OnlySuperUser = false;
        }

        public IsAuthorizedAttribute(Boolean onlySuperUser)
        {
            OnlySuperUser = onlySuperUser;
        }

        public void OnActionExecuting(ActionExecutingContext context, IUsersService usersService)
        {
            if (context.ActionDescriptor.EndpointMetadata.Any(em => em.GetType() == typeof(AllowAnonymousAttribute))) return;

            IRequestCookieCollection cookies = context.HttpContext.Request.Cookies;
            if (!cookies.TryGetValue(CookieName, out string? token))
            {
                SetUnauthenticated(context);
                return;
            }


            UserToken? userToken = usersService.GetUserToken(token);
            if (userToken is null)
            {
                SetUnauthenticated(context);
                return;
            }
            if (userToken.IsExpired)
            {
                SetUnauthenticated(context);
                return;
            }

            User? user = usersService.GetUser(userToken.UserId);
            if (user is null)
            {
                SetUnauthenticated(context);
                return;
            }

            if (OnlySuperUser && user.Role != UserRole.Super) {
                SetUnauthorized(context);
                return;
             }

            SystemUser systemUser = new SystemUser(user);
            context.HttpContext.Items[SystemUserContextItemName] = systemUser;
        }

        private void SetUnauthenticated(ActionExecutingContext context)
        {
            ClearContext(context);

            if (context.HttpContext.Request.IsAjaxRequest())
            {
                ClearAjaxRequest(context);
            }
            else
            {
                context.Result = new RedirectResult("/Auth");
            }
        }

        private void SetUnauthorized(ActionExecutingContext context)
        {
            if (context.HttpContext.Request.IsAjaxRequest())
            {
                ClearAjaxRequest(context);
            }
            else
            {
                context.Result = new RedirectResult("/Error/403");
            }
        }

        private void ClearAjaxRequest(ActionExecutingContext context)
        {
            context.Result = new EmptyResult();
            context.HttpContext.Response.Clear();
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
        }
        private void ClearContext(ActionExecutingContext context)
        {
            context.HttpContext.Response.Cookies.Delete(CookieName);
        }
    }

    public class IsAuthorizedFilter : IActionFilter
    {
        private readonly IUsersService _usersService;

        public IsAuthorizedFilter(IUsersService usersService)
        {
            _usersService = usersService;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            IsAuthorizedAttribute authAttribute = context.ActionDescriptor.FilterDescriptors
                .OrderByDescending(d => d.Scope)
                .Select(d => d.Filter)
                .OfType<IsAuthorizedAttribute>()
                .First();

            authAttribute?.OnActionExecuting(context, _usersService);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // no implementation
        }
    }
}
