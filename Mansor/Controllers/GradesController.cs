using Mansor.Business.Services;
using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class GradesController : ControllerBase
	{
		private readonly IGradesService _gradesService;
		private readonly ITaskGroupsService _taskGroupsService;
		public GradesController(IGradesService gradesService, ITaskGroupsService taskGroupsService)
		{
			_gradesService = gradesService;
			_taskGroupsService = taskGroupsService;
		}

		[HttpGet]
		[Route("api/grades")]
		public async Task<IEnumerable<Grade>> GetAllGrades()
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			return await _gradesService.GetGradesAsync();
		}

		[HttpGet]
		[Route("api/grades/{taskGroupId}")]
		public async Task<IActionResult> GetAllGrades([FromRoute] int taskGroupId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var grade = await _gradesService.GetAllGrades(taskGroupId);

			if (!grade.Any())
			{
				return BadRequest("No existing grades!");
			}
			return Ok(grade);
		}

		[HttpGet]
		[Route("api/grade/{id}")]
		public async Task<IActionResult> GetGradeById([FromRoute] int id)
		{
			var targetGrade = await _gradesService.GetGradeByIdAsync(id);
			if (targetGrade == null)
			{
				return NotFound();
			}
			return Ok(targetGrade);
		}

		[HttpPost]
		[Route("api/create/grade/{taskGroupId}")]
		public async Task<IActionResult> CreateGrades([FromRoute] int taskGroupId, [FromBody] GradeRequestModel gradesRequestModel)
		{
			var taskGroup = await _taskGroupsService.GetTaskGroupById(taskGroupId);
			var grade = gradesRequestModel.Grades(taskGroup);

			var result = await _gradesService.CreateGrade(grade);

			return Ok(result);
		}

		[HttpDelete]
		[Route("api/delete/grade/{Id}")]
		public async Task<IActionResult> DeleteGrade([FromRoute] int id)
		{
			var targetGrade = await _gradesService.GetGradeById(id);
			if (targetGrade == null)
			{
				return NotFound("Grade doesn't exist");
			}
			await _gradesService.DeleteAsync(targetGrade);

			return Ok(targetGrade);
		}
	}
}
