using DoItTest.Site.Areas.Bases;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas
{
    public class UsersController : BaseController
    {
        [Route("/Users")]
        public IActionResult App()
        {
            return ReactApp();
        }
    }
}
