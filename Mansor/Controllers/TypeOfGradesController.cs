using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class TypeOfGradesController : ControllerBase
	{
		private readonly ITypeOfGradesService _typeOfGradesService;
		private readonly IStudentsService _studentsService;
		public TypeOfGradesController(ITypeOfGradesService typeOfGradesService, IStudentsService studentsService)
		{
			_typeOfGradesService = typeOfGradesService;
			_studentsService = studentsService;
		}

		[HttpGet]
		[Route("api/typeOfGrades")]
		public async Task<IEnumerable<TypeOfGrade>> GetAllTasks()
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			return await _typeOfGradesService.GetTypeOfGradesAsync();
		}

		[HttpGet]
		[Route("api/typeOfGrades/{studentId}")]
		public async Task<IActionResult> GetAllTypes([FromRoute] int studentId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var items = await _typeOfGradesService.GetTypeOfGradesByStudentId(studentId);

			if (!items.Any())
			{
				return BadRequest("No existing types!");
			}
			return Ok(items);
		}

		[HttpGet]
		[Route("api/typeOfGrade/{id}")]
		public async Task<IActionResult> GetTypeOfGradeById([FromRoute] int id)
		{
			var targetTypeOfGrade = await _typeOfGradesService.GetTypeOfGradeByIdAsync(id);
			if (targetTypeOfGrade == null)
			{
				return NotFound();
			}
			return Ok(targetTypeOfGrade);
		}

		[HttpPost]
		[Route("api/create/typeOfGrade/{studentId}")]
		public async Task<IActionResult> CreateTypeOfGrades([FromRoute] int studentId, [FromBody] TypeOfGradeRequestModel typeOfGradesRequestModel)
		{
			var student = await _studentsService.GetStudentById(studentId);
			var typeOfGrade = typeOfGradesRequestModel.ToCreateTypeOfGrade(student);

			var result = await _typeOfGradesService.CreateTypeOfGrade(typeOfGrade);

			return Ok(result);
		}

		[HttpDelete]
		[Route("api/delete/typeOfGrade/{Id}")]
		public async Task<IActionResult> DeleteTypeOfGrade([FromRoute] int id)
		{
			var targetType = await _typeOfGradesService.GetTypeOfGradeById(id);
			if (targetType == null)
			{
				return NotFound("Type doesn't exist");
			}
			await _typeOfGradesService.DeleteAsync(targetType);

			return Ok(targetType);
		}
	}
}
