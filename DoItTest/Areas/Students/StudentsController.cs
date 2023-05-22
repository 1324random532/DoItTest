using DoItTest.Site.Areas.Bases;
using DoItTest.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;
using DoItTest.Domain.Services;
using DoItTest.Domain.Students;
using Microsoft.AspNetCore.Authorization;

namespace DoItTest.Site.Areas.Students
{
    public class StudentsController : BaseController
    {
        private readonly IStudentsService _studentsService;

        public StudentsController(IStudentsService studentsService)
        {
            _studentsService = studentsService;
        }

        //[HttpPost("/Students/Save")]
        //public Result SaveStudent([FromBody] StudentBlank studentBlank)
        //{
        //    DataResult<Guid> result = _studentsService.SaveStudent(studentBlank, SystemUser.Id);

        //    return result.IsSuccess ? Result.Success() : Result.Fail(result.Errors);
        //}

        [AllowAnonymous]
        [HttpGet("/Students/GetStudent")]
        public Student? GetStudent(Guid id)
        {
            return _studentsService.GetStudent(id);
        }

        [HttpGet("/Students/GetStudents")]
        public Student[] GetStudents(Guid[] ids)
        {
            return _studentsService.GetStudents(ids);
        }
    }
}
