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
		private readonly IStudentsService _studentsService;
		private readonly IUsersService _usersService;
		public GradesController(IGradesService gradesService, IStudentsService studentsService)
		{
			_gradesService = gradesService;
			_studentsService = studentsService;
		}

		[HttpGet]
		[Route("api/grades")]
		public async Task<IEnumerable<Grade>> GetAllGrades()
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			return await _gradesService.GetGradesAsync();
		}

		[HttpGet]
		[Route("api/grades/{studentId}")]
		public async Task<IActionResult> GetAllItems([FromRoute] int studentId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var grades = await _gradesService.GetAllGrades(studentId);

			if (!grades.Any())
			{
				return BadRequest("No existing grades!");
			}
			return Ok(grades);
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
		[Route("api/create/grade/{studentId}")]
		public async Task<IActionResult> CreateGrades([FromRoute] int studentId, [FromBody] GradeRequestModel gradesRequestModel)
		{
			var student = await _studentsService.GetStudentById(studentId);
			var grade = gradesRequestModel.Grades(student);

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
