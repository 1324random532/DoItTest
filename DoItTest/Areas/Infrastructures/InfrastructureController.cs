using DoItTest.Site.Areas.Bases;
using Microsoft.AspNetCore.Mvc;

namespace FKM.BackOffice.Areas.Infrastructures
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
