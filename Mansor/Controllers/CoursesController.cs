using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class CoursesController : ControllerBase
	{
		private readonly ICoursesService _coursesService;
		private readonly ISpecialitiesService _specialitysService;
		public CoursesController(ICoursesService coursesService, ISpecialitiesService specialitysService)
		{
			_coursesService = coursesService;
			_specialitysService = specialitysService;
		}

		[HttpGet]
		[Route("api/courses/{specialityId}")]
		public async Task<IActionResult> GetAllCourses([FromRoute] int specialityId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var items = await _coursesService.GetAllCourses(specialityId);

			if (!items.Any())
			{
				return BadRequest("No existing courses!");
			}
			return Ok(items);
		}

		[HttpGet]
		[Route("api/course/{id}")]
		public async Task<IActionResult> GetCourseById([FromRoute] int id)
		{
			var targetCourse = await _coursesService.GetCourseByIdAsync(id);
			if (targetCourse == null)
			{
				return NotFound();
			}
			return Ok(targetCourse);
		}

		[HttpPost]
		[Route("api/create/course/{specialityId}")]
		public async Task<IActionResult> CreateCourses([FromRoute] int specialityId, [FromBody] CourseRequestModel coursesRequestModel)
		{
			var speciality = await _specialitysService.GetSpecialityById(specialityId);
			var course = coursesRequestModel.Courses(speciality);

			var result = await _coursesService.CreateCourse(course);

			return Ok(result);
		}

		[HttpDelete]
		[Route("api/delete/course/{Id}")]
		public async Task<IActionResult> DeleteCourse([FromRoute] int id)
		{
			var targetItem = await _coursesService.GetCourseById(id);
			if (targetItem == null)
			{
				return NotFound("Course doesn't exist");
			}
			await _coursesService.DeleteAsync(targetItem);

			return Ok(targetItem);
		}
	}
}
