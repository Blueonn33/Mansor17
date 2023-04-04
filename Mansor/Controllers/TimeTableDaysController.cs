using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mansor.Data.Models;
using Mansor.Business.Services.Interfaces;
using Mansor.Data;
using Microsoft.AspNetCore.Identity;
using Mansor.Models;

namespace Mansor.Controllers
{
    [ApiController]
    [Authorize]
    public class TimeTableDaysController : ControllerBase
    {
        private readonly ITimeTableDaysService _timeTableDaysService;
        private readonly IUsersService _usersService;
        private readonly UserManager<User> _userManager;
        public TimeTableDaysController(ITimeTableDaysService timeTableDaysService, IUsersService usersService,
            UserManager<User> userManager)
        {
            _timeTableDaysService = timeTableDaysService;
            _usersService = usersService;
            _userManager = userManager;
        }

        //[HttpGet]
        //[Route("api/days")]
        //public async Task<IEnumerable<TimeTableDay>> GetAllDays()
        //{
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    return await _timeTableDaysService.GetDaysAsync();
        //}

        [HttpGet]
        [Route("api/days")]
        public async Task<IActionResult> GetAllDays()
        {
            var userId = _usersService.GetCurrentUserId().Result;
            var timeTableDays = await _timeTableDaysService.GetDaysByUserId(userId);

            if (!timeTableDays.Any())
            {
                return BadRequest("No existing days!");
            }
            return Ok(timeTableDays);
        }

        [HttpGet]
        [Route("api/timeTableDay/{id}")]
        public async Task<IActionResult> GetDayById([FromRoute] int id)
        {
            var targetTimeTableDay = await _timeTableDaysService.GetDayByIdAsync(id);
            if (targetTimeTableDay == null)
            {
                return NotFound();
            }
            return Ok(targetTimeTableDay);
        }

        //[HttpPost]
        //[Route("api/create/timeTableDay")]
        //public async Task<IActionResult> CreateDay([FromBody] TimeTableDay createDay)
        //{
        //    var timeTableDay = await _timeTableDaysService.GetDayByNameAsync(createDay.Name);

        //    if (timeTableDay != null)
        //    {
        //        return BadRequest("The day already exists");
        //    }

        //    await _timeTableDaysService.AddDayAsync(createDay);
        //    return Ok(createDay);
        //}

        [HttpPost]
        [Route("api/create/timeTableDay")]
        public async Task<IActionResult> CreateDay([FromBody] TimeTableDayRequestModel timeTableDayRequestModel)
        {
            var userId = _usersService.GetCurrentUserId().Result;
            var timeTableDay = timeTableDayRequestModel.ToCreateDay(userId);
            var result = await _timeTableDaysService.CreateDay(timeTableDay);

            if (result == null)
            {
                return BadRequest("The day already exists");
            }
            else
            {
                return Ok(result);
            }

        }

        [HttpDelete]
        [Route("api/delete/timeTableDay/{id}")]

        public async Task<IActionResult> DeleteDay([FromRoute] int id)
        {
            var targetTimeTableDay = await _timeTableDaysService.GetDayByIdAsync(id);
            if (targetTimeTableDay == null)
            {
                return NotFound("Day doesn't exist");
            }
            await _timeTableDaysService.DeleteAsync(targetTimeTableDay);

            return Ok(targetTimeTableDay);
        }
    }
}