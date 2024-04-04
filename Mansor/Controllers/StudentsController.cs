using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class StudentsController : ControllerBase
	{
		private readonly IStudentsService _studentsService;
		private readonly ISpecialitiesService _specialitiesService;
		private readonly IUsersService _usersService;
		public StudentsController(IStudentsService studentsService, ISpecialitiesService specialitiesService)
		{
			_studentsService = studentsService;
			_specialitiesService = specialitiesService;
		}

		[HttpGet]
		[Route("api/students")]
		public async Task<IEnumerable<Student>> GetAllStudents()
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			return await _studentsService.GetStudentsAsync();
		}

		[HttpGet]
		[Route("api/students/{specialityId}")]
		public async Task<IActionResult> GetAllItems([FromRoute] int specialityId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var students = await _studentsService.GetAllStudents(specialityId);

			if (!students.Any())
			{
				return BadRequest("No existing students!");
			}
			return Ok(students);
		}

		[HttpGet]
		[Route("api/student/{id}")]
		public async Task<IActionResult> GetStudentById([FromRoute] int id)
		{
			var targetStudent = await _studentsService.GetStudentByIdAsync(id);
			if (targetStudent == null)
			{
				return NotFound();
			}
			return Ok(targetStudent);
		}

		[HttpPost]
		[Route("api/create/student/{specialityId}")]
		public async Task<IActionResult> CreateStudents([FromRoute] int specialityId, [FromBody] StudentRequestModel studentsRequestModel)
		{
			var speciality = await _specialitiesService.GetSpecialityById(specialityId);
			var student = studentsRequestModel.Students(speciality);

			var result = await _studentsService.CreateStudent(student);

			return Ok(result);
		}

		[HttpDelete]
		[Route("api/delete/student/{Id}")]
		public async Task<IActionResult> DeleteStudent([FromRoute] int id)
		{
			var targetStudent = await _studentsService.GetStudentById(id);
			if (targetStudent == null)
			{
				return NotFound("Student doesn't exist");
			}
			await _studentsService.DeleteAsync(targetStudent);

			return Ok(targetStudent);
		}

		
	}
}
