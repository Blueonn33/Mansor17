using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class SemestersController : ControllerBase
	{
		private readonly ISemestersService _semestersService;
		private readonly ICoursesService _coursesService;
		public SemestersController(ISemestersService semestersService, ICoursesService coursesService)
		{
			_semestersService = semestersService;
			_coursesService = coursesService;
		}

		[HttpGet]
		[Route("api/semesters/{courseId}")]
		public async Task<IActionResult> GetAllSemesters([FromRoute] int courseId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var items = await _semestersService.GetAllSemesters(courseId);

			if (!items.Any())
			{
				return BadRequest("No existing semesters!");
			}
			return Ok(items);
		}

		[HttpGet]
		[Route("api/semester/{id}")]
		public async Task<IActionResult> GetSemesterById([FromRoute] int id)
		{
			var targetSemester = await _semestersService.GetSemesterByIdAsync(id);
			if (targetSemester == null)
			{
				return NotFound();
			}
			return Ok(targetSemester);
		}

		[HttpPost]
		[Route("api/create/semester/{courseId}")]
		public async Task<IActionResult> CreateSemesters([FromRoute] int courseId, [FromBody] SemesterRequestModel semestersRequestModel)
		{
			var course = await _coursesService.GetCourseById(courseId);
			var semester = semestersRequestModel.Semesters(course);

			var result = await _semestersService.CreateSemester(semester);

			return Ok(result);
		}

		[HttpDelete]
		[Route("api/delete/semester/{Id}")]
		public async Task<IActionResult> DeleteSemester([FromRoute] int id)
		{
			var targetItem = await _semestersService.GetSemesterById(id);
			if (targetItem == null)
			{
				return NotFound("Semester doesn't exist");
			}
			await _semestersService.DeleteAsync(targetItem);

			return Ok(targetItem);
		}
	}
}
