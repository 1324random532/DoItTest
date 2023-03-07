using DoItTest.Site.Areas.Bases;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Infrastructures
{
    public class InfrastructureController : BaseController
    {
        [HttpGet("/")]
        public IActionResult App()
        {
            return ReactApp();
        }
    }
}
