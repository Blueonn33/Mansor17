namespace Mansor.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Mansor.Business.Services.Interfaces;
    using Mansor.Models;
    using Microsoft.AspNetCore.Authorization;

    [ApiController]
    public class TimeTableItemController : ControllerBase
    {
        private readonly ITimeTableItemsService _timeTableItemsService;
        private readonly ITimeTableDaysService _timeTableDaysService;
        public TimeTableItemController(ITimeTableItemsService timeTableItemsService, ITimeTableDaysService timeTableDaysService)
        {
            _timeTableItemsService = timeTableItemsService;
            _timeTableDaysService = timeTableDaysService;
        }

        [HttpGet]
        [Route("api/subjects/{timeTableDayId}")]
        public async Task<IActionResult> GetAllTimeTableItems([FromRoute] int timeTableDayId)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var records = await _timeTableItemsService.GetAllTimeTableItems(timeTableDayId);

            if (!records.Any())
            {
                return BadRequest("No existing items");
            }
            return Ok(records);
        }

        [HttpPost]
        [Route("api/create/subject/{timeTableDayId}")]
        public async Task<IActionResult> CreateSubjects([FromRoute] int timeTableDayId, [FromBody] TimeTableItemRequestModel timeTableItemsRequestModel)
        {
            var timeTableDay = await _timeTableDaysService.GetDayById(timeTableDayId);
            var timeTableItem = timeTableItemsRequestModel.ToCreateTimeTableItem(timeTableDay);

            var result = await _timeTableItemsService.CreateTimeTableItem(timeTableItem);

            return Ok(result);
        }

        [HttpDelete]
        [Route("api/delete/subject/{id}")]

        public async Task<IActionResult> DeleteSubject([FromRoute] int id)
        {
            var targetSubject = await _timeTableItemsService.GetSubjectByIdAsync(id);
            if (targetSubject == null)
            {
                return NotFound("Subject doesn't exist");
            }
            await _timeTableItemsService.DeleteAsync(targetSubject);

            return Ok(targetSubject);
        }
    }
}
