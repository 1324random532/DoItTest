using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using DoItTest.Site.Areas.Bases;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Students
{
    public class StudentsController : BaseController
    {
        private readonly IStudentsService _studentsService;

        public StudentsController(IStudentsService studentsService)
        {
            _studentsService = studentsService;
        }

        [HttpPost("/Students/Save")]
        public Result SaveStudent([FromBody] StudentBlank studentBlank)
        {
            return _studentsService.SaveStudent(studentBlank, SystemUser.Id);
        }
    }
}
