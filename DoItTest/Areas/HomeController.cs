using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Areas
{
    public class HomeController : Controller
    {
        [Route("")]
        public IActionResult App()
        {
            return View();
        }
    }
}
