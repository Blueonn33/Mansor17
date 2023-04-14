namespace Mansor.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Mansor.Business.Services.Interfaces;
    using Mansor.Models;
    using Microsoft.AspNetCore.Authorization;
    using Mansor.Data.Models;

    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectsService _subjectsService;
        private readonly IDaysService _daysService;
        private readonly IUsersService _usersService;
        public SubjectController(ISubjectsService subjectsService, IDaysService daysService, 
            IUsersService usersService)
        {
            _subjectsService = subjectsService;
            _daysService = daysService;
            _usersService = usersService;
        }

        //[HttpGet]
        //[Route("api/subjects")]
        //public async Task<IEnumerable<Subject>> GetAllSubjects()
        //{
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    return await _subjectsService.GetSubjectsAsync();
        //}

        [HttpGet]
        [Route("api/subjects")]
        public async Task<IEnumerable<Subject>> GetAllSubjectsForUser()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return await _subjectsService.GetSubjectsAsync();
        }

        //[HttpGet]
        //[Route("api/subjects")]
        //public async Task<IActionResult> GetAllSubjects()
        //{
        //    var userId = _usersService.GetCurrentUserId().Result;
        //    var subjects = await _subjectsService.GetSubjectsByUserId(userId);

        //    if (!subjects.Any())
        //    {
        //        return BadRequest("No existing subjects!");
        //    }
        //    return Ok(subjects);
        //}

        [HttpGet]
        [Route("api/subjects/{dayId}")]
        public async Task<IActionResult> GetAllSubjectsForDay([FromRoute] int dayId)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var userId = _usersService.GetCurrentUserId().Result;
            var subjects = await _subjectsService.GetSubjectsForDay(dayId, userId);

            if (!subjects.Any())
            {
                return BadRequest("No existing subjects");
            }
            return Ok(subjects);
        }

        //[HttpGet]
        //[Route("api/subjects/{dayId}")]
        //public async Task<IActionResult> GetAllSubjects([FromRoute] int dayId)
        //{
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    var subjects = await _subjectsService.GetAllSubjects(dayId);

        //    if (!subjects.Any())
        //    {
        //        return BadRequest("No existing subjects!");
        //    }
        //    return Ok(subjects);
        //}

        //[HttpGet]
        //[Route("api/subjects/{dayId}")]
        //public async Task<IActionResult> GetAllSubjectsForDay([FromRoute] int dayId)
        //{
        //    var userId = _usersService.GetCurrentUserId().Result;
        //    var subject = await _subjectsService.GetSubjectsForDay(dayId, userId);

        //    return Ok(subject);
        //}

        //[HttpGet]
        //[Route("api/subjects/{dayId}")]
        //public async Task<IActionResult> GetAllSubjects([FromRoute] int dayId)
        //{
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    var subjects = await _subjectsService.GetAllSubjects(dayId);

        //    if (!subjects.Any())
        //    {
        //        return BadRequest("No existing subjects!");
        //    }
        //    return Ok(subjects);
        //}

        [HttpGet]
        [Route("api/userSubjects")]
        public async Task<IActionResult> GetAllUserSubjects()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var userId = _usersService.GetCurrentUserId().Result;
            var subjects = await _subjectsService.GetSubjectsByUserId(userId);

            if (!subjects.Any())
            {
                return BadRequest("No existing subjects!");
            }
            return Ok(subjects);
        }

       
        //[HttpGet]
        //[Route("api/subjects")]
        //public async Task<IActionResult> GetAllUserSubjects()
        //{
        //    var userId = _usersService.GetCurrentUserId().Result;
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    var subjects = await _subjectsService.GetSubjectsByUserId(userId);

        //    if (!subjects.Any())
        //    {
        //        return BadRequest("No existing subjects");
        //    }
        //    return Ok(subjects);
        //}

        [HttpPost]
        [Route("api/create/subject/{dayId}")]
        public async Task<IActionResult> CreateSubjects([FromRoute] int dayId, [FromBody] SubjectRequestModel subjectsRequestModel)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var userId = _usersService.GetCurrentUserId().Result;
            var day = await _daysService.GetDayByIdAsync(dayId);
            var subject = subjectsRequestModel.ToCreateSubject(day, userId);

            var result = await _subjectsService.CreateSubject(subject);

            return Ok(result);
        }

        [HttpDelete]
        [Route("api/delete/subject/{id}")]

        public async Task<IActionResult> DeleteSubject([FromRoute] int id)
        {
            var targetSubject = await _subjectsService.GetSubjectByIdAsync(id);
            if (targetSubject == null)
            {
                return NotFound("Subject doesn't exist");
            }
            await _subjectsService.DeleteAsync(targetSubject);

            return Ok(targetSubject);
        }
    }
}
