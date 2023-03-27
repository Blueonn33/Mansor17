using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
    [ApiController]
    public class TaskGroupsController : ControllerBase
    {
        private readonly ITaskGroupsService _taskGroupsService;

        public TaskGroupsController(ITaskGroupsService taskGroupsService)
        {
            _taskGroupsService = taskGroupsService;
        }
        [HttpGet]
        [Route("api/taskGroups")]
        public async Task<IEnumerable<TaskGroup>> GetAllTaskGroups()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return await _taskGroupsService.GetTaskGroupsAsync();
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
        [Route("api/create/taskGroup")]
        public async Task<IActionResult> CreateTaskGroup([FromBody] TaskGroup createTaskGroup)
        {
            var taskGroup = await _taskGroupsService.GetTaskGroupByNameAsync(createTaskGroup.Name);

            if (taskGroup != null)
            {
                return BadRequest("The group already exists");
            }

            await _taskGroupsService.AddTaskGroupAsync(createTaskGroup);
            return Ok(createTaskGroup);
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