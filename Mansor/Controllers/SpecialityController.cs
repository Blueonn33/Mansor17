using Mansor.Business.Services.Interfaces;
using Mansor.Data;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class SpecialitiesController : ControllerBase
	{
		private readonly ISpecialitiesService _SpecialitiesService;
		private readonly IUsersService _usersService;
		private readonly UserManager<User> _userManager;

		public SpecialitiesController(ISpecialitiesService SpecialitiesService, IUsersService usersService,
			UserManager<User> userManager)
		{
			_SpecialitiesService = SpecialitiesService;
			_usersService = usersService;
			_userManager = userManager;
		}

		[HttpGet]
		[Route("api/specialities")]
		public async Task<IActionResult> GetAllSpecialities()
		{
			var userId = _usersService.GetCurrentUserId().Result;
			var Specialities = await _SpecialitiesService.GetSpecialitiesByUserId(userId);

			if (!Specialities.Any())
			{
				return BadRequest("No existing task groups!");
			}
			return Ok(Specialities);
		}

		[HttpGet]
		[Route("api/speciality/{id}")]
		public async Task<IActionResult> GetSpecialityById([FromRoute] int id)
		{
			var targetSpeciality = await _SpecialitiesService.GetSpecialityByIdAsync(id);
			if (targetSpeciality == null)
			{
				return NotFound();
			}
			return Ok(targetSpeciality);
		}

		[HttpPost]
		[Route("api/create/speciality")]
		public async Task<IActionResult> CreateSpeciality([FromBody] SpecialityRequestModel SpecialityRequestModel)
		{
			var userId = _usersService.GetCurrentUserId().Result;
			var Speciality = SpecialityRequestModel.ToCreateSpeciality(userId);
			var result = await _SpecialitiesService.CreateSpeciality(Speciality);

			if (result == null)
			{
				return BadRequest("The speciality already exists");
			}
			else
			{
				return Ok(result);
			}

		}

		[HttpDelete]
		[Route("api/delete/speciality/{id}")]
		public async Task<IActionResult> DeleteSpeciality([FromRoute] int id)
		{
			var targetSpeciality = await _SpecialitiesService.GetSpecialityByIdAsync(id);
			if (targetSpeciality == null)
			{
				return NotFound("Speciality doesn't exist");
			}
			await _SpecialitiesService.DeleteAsync(targetSpeciality);

			return Ok(targetSpeciality);
		}

		[HttpPatch]
		[Route("api/edit/speciality/{id}")]
		public async Task<IActionResult> EditSpecialityName([FromRoute] int id, [FromBody] Speciality Speciality)
		{
			var targetSpeciality = await _SpecialitiesService.GetSpecialityByIdAsync(id);
			if (targetSpeciality == null)
			{
				return NotFound();
			}

			if (targetSpeciality.Name == null || targetSpeciality.Name == string.Empty)
			{
				return BadRequest();
			}
			if (targetSpeciality.Name == Speciality.Name)
			{
				return BadRequest();
			}

			targetSpeciality.Name = Speciality.Name;
			await _SpecialitiesService.UpdateSpecialityAsync(targetSpeciality);

			return Ok(targetSpeciality);
		}
	}
}