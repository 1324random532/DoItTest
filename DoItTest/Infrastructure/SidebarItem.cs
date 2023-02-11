using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace DoItTest.Site.Infrastructure
{
    public class SidebarItem
    {
        private static readonly Dictionary<string, Type> ControllerTypes = typeof(SidebarItem).Assembly.GetTypes()
            .Where(t => typeof(Controller).IsAssignableFrom(t) && !t.IsAbstract).ToDictionary(t => t.Name);

        public string Text { get; }
        public string Url { get; }
        public SidebarIconType Icon { get; }
        public SidebarItem[] InnerItems { get; }
        public bool IsGroup { get; }


        private SidebarItem(string text, string url, SidebarIconType icon)
        {
            Text = text;
            Url = url[0] == '/' ? url : $"/{url}";
            Icon = icon;
            InnerItems = new SidebarItem[0];
            IsGroup = false;
        }

        private SidebarItem(string text, SidebarIconType icon, SidebarItem[] innerItems)
        {
            Text = text;
            Url = string.Empty;
            Icon = icon;
            InnerItems = innerItems;
            IsGroup = true;
        }

        public static SidebarItem ListItem(string text, string action, SidebarIconType icon, [CallerArgumentExpression("action")] string actionExpression = "")
        {
            if (!actionExpression.StartsWith("nameof(") && !actionExpression.EndsWith(")"))
                throw new Exception("Параметр action указан неправильно. Необходимый формат: nameof(ControllerName.MethodName)");

            string[] routeParts = actionExpression.Replace("nameof(", "").Replace(")", "").Split('.');
            if (routeParts.Length < 2)
                throw new Exception("Параметр action указан неправильно. Необходимый формат: nameof(ControllerName.MethodName)");

            string controllerName = routeParts[^2];

            if (!ControllerTypes.TryGetValue(controllerName, out Type? type))
                throw new Exception($"Контроллеер {controllerName} не найден");

            MethodInfo? methodInfo = type.GetMethod(action);
            if (methodInfo is null)
                throw new Exception($"Метод {action} контроллера {controllerName} не найден");

            string? url = methodInfo.GetCustomAttributes<HttpGetAttribute>().FirstOrDefault()?.Template;
            if (string.IsNullOrWhiteSpace(url))
                throw new Exception($"Route для метода {action} контроллера {controllerName} не указан");

            return new(text, url, icon);
        }

        public static SidebarItem ListGroup(string text, SidebarIconType icon, SidebarItem[] innerItems)
        => new(text, icon, innerItems);
    }
}
