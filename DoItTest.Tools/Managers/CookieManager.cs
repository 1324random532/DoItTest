using Microsoft.AspNetCore.Http;
using System.Net;

namespace DoItTest.Tools.Managers
{
    public static class CookieManager
    {
        /// <summary>
        /// Запись в Cookie
        /// </summary>
        public static void Write(HttpResponse response, Cookie cookie, DateTime expires)
        {
            CookieOptions options = new CookieOptions();
            options.Expires = expires;

            response.Cookies.Append(cookie.Name, cookie.Value, options);
        }

        /// <summary>
        /// Чтение из Cookie
        /// </summary>
        public static object? Read(HttpRequest request, string cookie)
        {
            return request.Cookies[cookie];
        }

        /// <summary>
        /// Удаление из Cookie
        /// </summary>
        public static void Delete(HttpResponse response, string cookie)
        {
            response.Cookies.Delete(cookie);
        }
    }
}
