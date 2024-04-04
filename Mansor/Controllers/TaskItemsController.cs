using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mansor.Controllers
{
    [ApiController]
    [Authorize]
    public class TaskItemsController : ControllerBase
    {
        private readonly ITaskItemsService _taskItemsService;
        private readonly ITaskGroupsService _taskGroupsService;
        public TaskItemsController(ITaskItemsService taskItemsService, ITaskGroupsService taskGroupsService)
        {
            _taskItemsService = taskItemsService;
            _taskGroupsService = taskGroupsService;
        }

        [HttpGet]
        [Route("api/taskItems")]
        public async Task<IEnumerable<TaskItem>> GetAllTasks()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return await _taskItemsService.GetTaskItemsAsync();
        }

        [HttpGet]
        [Route("api/taskItems/{taskGroupId}")]
        public async Task<IActionResult> GetAllItems([FromRoute] int taskGroupId)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var items = await _taskItemsService.GetAllItems(taskGroupId);

            if (!items.Any())
            {
                return BadRequest("No existing items!");
            }
            return Ok(items);
        }

        [HttpGet]
        [Route("api/taskItem/{id}")]
        public async Task<IActionResult> GetTaskItemById([FromRoute] int id)
        {
            var targetTaskItem = await _taskItemsService.GetTaskItemByIdAsync(id);
            if (targetTaskItem == null)
            {
                return NotFound();
            }
            return Ok(targetTaskItem);
        }

        [HttpPost]
        [Route("api/create/taskItem/{taskGroupId}")]
        public async Task<IActionResult> CreateTaskItems([FromRoute] int taskGroupId, [FromBody] TaskItemRequestModel taskItemsRequestModel)
        {
            var taskGroup = await _taskGroupsService.GetTaskGroupById(taskGroupId);
            var taskItem = taskItemsRequestModel.TaskItems(taskGroup);

            var result = await _taskItemsService.CreateTaskItem(taskItem);

            return Ok(result);
        }

        [HttpDelete]
        [Route("api/delete/taskItem/{Id}")]
        public async Task<IActionResult> DeleteTaskItem([FromRoute] int id)
        {
            var targetItem = await _taskItemsService.GetTaskItemById(id);
            if (targetItem == null)
            {
                return NotFound("Task doesn't exist");
            }
            await _taskItemsService.DeleteAsync(targetItem);

            return Ok(targetItem);
        }

        [HttpPatch]
        [Route("api/edit/taskItem/{id}")]
        public async Task<IActionResult> EditTaskItemColor([FromRoute] int id, [FromBody] TaskItem taskItem)
        {
            var targetTaskItem = await _taskItemsService.GetTaskItemByIdAsync(id);
            if (targetTaskItem == null)
            {
                return NotFound();
            }

            if (targetTaskItem.Color == null || targetTaskItem.Color == string.Empty)
            {
                return BadRequest();
            }
            if (targetTaskItem.Color == taskItem.Color)
            {
                return BadRequest();
            }

            targetTaskItem.Color = taskItem.Color;
            await _taskItemsService.UpdateTaskItemAsync(targetTaskItem);

            return Ok(targetTaskItem);
        }
    }
}
