using DoItTest.Domain.Answers;
using DoItTest.Domain.Services;
using DoItTest.Domain.Users;
using DoItTest.Site.Areas.Bases;
using Microsoft.AspNetCore.Mvc;

namespace DoItTest.Site.Areas.Answers
{
    public class AnswersController : BaseController
    {
        private readonly IAnswersService _answersService;

        public AnswersController(IAnswersService answersService)
        {
            _answersService = answersService;
        }

        [HttpGet("/Answers/GetAnswers")]
        public Answer[] GetAnswers(Guid studentTestId)
        {
            Guid? userId = SystemUser.Role == UserRole.Super ? null : SystemUser.Id;
            return _answersService.GetAnswers(studentTestId, userId);
        }
    }
}
