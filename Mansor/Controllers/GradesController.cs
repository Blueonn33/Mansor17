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
		private readonly ITypeOfGradesService _typeOfGradesService;
		public GradesController(IGradesService gradesService, ITypeOfGradesService typeOfGradesService)
		{
			_gradesService = gradesService;
			_typeOfGradesService = typeOfGradesService;
		}

		[HttpGet]
		[Route("api/grades")]
		public async Task<IEnumerable<Grade>> GetAllGrades()
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			return await _gradesService.GetGradesAsync();
		}

		[HttpGet]
		[Route("api/grades/{typeOfGradeId}")]
		public async Task<IActionResult> GetAllItems([FromRoute] int typeOfGradeId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var grades = await _gradesService.GetAllGrades(typeOfGradeId);

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
		[Route("api/create/grade/{typeOfGradeId}")]
		public async Task<IActionResult> CreateGrades([FromRoute] int typeOfGradeId, [FromBody] GradeRequestModel gradesRequestModel)
		{
			var typeOfGrade = await _typeOfGradesService.GetTypeOfGradeById(typeOfGradeId);
			var grade = gradesRequestModel.Grades(typeOfGrade);

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
