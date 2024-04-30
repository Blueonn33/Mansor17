using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
	[ApiController]
	[Authorize]
	public class LiteraturesController : ControllerBase
	{
		private readonly ILiteraturesService _literaturesService;
		private readonly ITaskGroupsService _taskGroupsService;
		public LiteraturesController(ILiteraturesService literaturesService, ITaskGroupsService taskGroupsService)
		{
			_literaturesService = literaturesService;
			_taskGroupsService = taskGroupsService;
		}

		[HttpGet]
		[Route("api/literatures")]
		public async Task<IEnumerable<Literature>> GetAllTasks()
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			return await _literaturesService.GetLiteraturesAsync();
		}

		[HttpGet]
		[Route("api/literatures/{taskGroupId}")]
		public async Task<IActionResult> GetAllItems([FromRoute] int taskGroupId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var items = await _literaturesService.GetAllLiteratures(taskGroupId);

			if (!items.Any())
			{
				return BadRequest("No existing items!");
			}
			return Ok(items);
		}

		[HttpGet]
		[Route("api/literature/{id}")]
		public async Task<IActionResult> GetLiteratureById([FromRoute] int id)
		{
			var targetLiterature = await _literaturesService.GetLiteratureByIdAsync(id);
			if (targetLiterature == null)
			{
				return NotFound();
			}
			return Ok(targetLiterature);
		}

		[HttpPost]
		[Route("api/create/literature/{taskGroupId}")]
		public async Task<IActionResult> CreateLiteratures([FromRoute] int taskGroupId, [FromBody] LiteratureRequestModel literaturesRequestModel)
		{
			var taskGroup = await _taskGroupsService.GetTaskGroupById(taskGroupId);
			var literature = literaturesRequestModel.Literatures(taskGroup);

			var result = await _literaturesService.CreateLiterature(literature);

			return Ok(result);
		}

		[HttpDelete]
		[Route("api/delete/literature/{Id}")]
		public async Task<IActionResult> DeleteLiterature([FromRoute] int id)
		{
			var targetItem = await _literaturesService.GetLiteratureById(id);
			if (targetItem == null)
			{
				return NotFound("Literature doesn't exist");
			}
			await _literaturesService.DeleteAsync(targetItem);

			return Ok(targetItem);
		}
	}
}
