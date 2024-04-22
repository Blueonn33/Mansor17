using Mansor.Business.Services;
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
    public class TaskGroupsController : ControllerBase
    {
        private readonly ITaskGroupsService _taskGroupsService;
        private readonly ISemestersService _semestersService;

        public TaskGroupsController(ITaskGroupsService taskGroupsService, ISemestersService semestersService)
        {
            _taskGroupsService = taskGroupsService;
            _semestersService = semestersService;
        }

		//[HttpGet]
		//[Route("api/taskGroups")]
		//public async Task<IActionResult> GetAllTaskGroups()
		//{
		//    var semesterId = _semestersService.GetCurrentSemesterId().Result;
		//    var taskGroups = await _taskGroupsService.GetTaskGroupsBySemesterId(semesterId);

		//    if (!taskGroups.Any())
		//    {
		//        return BadRequest("No existing task groups!");
		//    }
		//    return Ok(taskGroups);
		//}

		//[HttpGet]
		//[Route("api/taskGroup/{id}")]
		//public async Task<IActionResult> GetTaskGroupById([FromRoute] int id)
		//{
		//    var targetTaskGroup = await _taskGroupsService.GetTaskGroupByIdAsync(id);
		//    if (targetTaskGroup == null)
		//    {
		//        return NotFound();
		//    }
		//    return Ok(targetTaskGroup);
		//}

		//[HttpPost]
		//[Route("api/create/taskGroup")]
		//public async Task<IActionResult> CreateTaskGroup([FromBody] TaskGroupRequestModel taskGroupRequestModel)
		//{
		//    var semesterId = _semestersService.GetCurrentSemesterId().Result;
		//    var taskGroup = taskGroupRequestModel.ToCreateTaskGroup(semesterId);
		//    var result = await _taskGroupsService.CreateTaskGroup(taskGroup);

		//    if (result == null)
		//    {
		//        return BadRequest("The group already exists");
		//    }
		//    else
		//    {
		//        return Ok(result);
		//    }

		//}

		[HttpGet]
		[Route("api/taskGroups/{semesterId}")]
		public async Task<IActionResult> GetAllTaskGroups([FromRoute] int semesterId)
		{
			Response.Headers.Add("Access-Control-Allow-Origin", "*");
			var items = await _taskGroupsService.GetAllTaskGroups(semesterId);

			if (!items.Any())
			{
				return BadRequest("No existing taskGroups!");
			}
			return Ok(items);
		}

		[HttpGet]
		[Route("api/taskGroup/{id}")]
		public async Task<IActionResult> GetTaskGroupById([FromRoute] int id)
		{
			var targetTaskGroup = await _taskGroupsService.GetTaskGroupByIdAsync(id);
			if (targetTaskGroup == null)
			{
				return NotFound();
			}
			return Ok(targetTaskGroup);
		}

		[HttpPost]
		[Route("api/create/taskGroup/{semesterId}")]
		public async Task<IActionResult> CreateTaskGroups([FromRoute] int semesterId, [FromBody] TaskGroupRequestModel taskGroupsRequestModel)
		{
			var semester = await _semestersService.GetSemesterById(semesterId);
			var taskGroup = taskGroupsRequestModel.ToCreateTaskGroup(semester);

			var result = await _taskGroupsService.CreateTaskGroup(taskGroup);

			return Ok(result);
		}

		[HttpDelete]
        [Route("api/delete/taskGroup/{id}")]
        public async Task<IActionResult> DeleteTaskGroup([FromRoute] int id)
        {
            var targetTaskGroup = await _taskGroupsService.GetTaskGroupByIdAsync(id);
            if (targetTaskGroup == null)
            {
                return NotFound("TaskGroup doesn't exist");
            }
            await _taskGroupsService.DeleteAsync(targetTaskGroup);

            return Ok(targetTaskGroup);
        }

        [HttpPatch]
        [Route("api/edit/taskGroup/{id}")]
        public async Task<IActionResult> EditTaskGroupName([FromRoute] int id, [FromBody] TaskGroup taskGroup)
        {
            var targetTaskGroup = await _taskGroupsService.GetTaskGroupByIdAsync(id);
            if (targetTaskGroup == null)
            {
                return NotFound();
            }

            if (targetTaskGroup.Name == null || targetTaskGroup.Name == string.Empty)
            {
                return BadRequest();
            }
            if (targetTaskGroup.Name == taskGroup.Name)
            {
                return BadRequest();
            }

            targetTaskGroup.Name = taskGroup.Name;
            await _taskGroupsService.UpdateTaskGroupAsync(targetTaskGroup);

            return Ok(targetTaskGroup);
        }
    }
}