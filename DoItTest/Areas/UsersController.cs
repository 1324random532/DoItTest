using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas
{
    public class UsersController : Controller
    {
        [Route("")]
        public IActionResult App()
        {
            return View();
        }
    }
}
