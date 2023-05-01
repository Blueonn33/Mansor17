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
    //[Authorize]
    public class TaskGroupsController : ControllerBase
    {
        private readonly ITaskGroupsService _taskGroupsService;
        private readonly IUsersService _usersService;
        private readonly UserManager<User> _userManager;

        public TaskGroupsController(ITaskGroupsService taskGroupsService, IUsersService usersService, 
            UserManager<User> userManager)
        {
            _taskGroupsService = taskGroupsService;
            _usersService = usersService;
            _userManager = userManager;
        }
        //[HttpGet]
        //[Route("api/taskGroups")]
        //public async Task<IEnumerable<TaskGroup>> GetAllTaskGroups()
        //{
        //    //var userId = _usersService.GetCurrentUserId().Result;
        //    //var taskGroups = await _taskGroupsService.GetTaskGroupsByUserId(userId);
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    return await _taskGroupsService.GetTaskGroupsAsync();
        //    //return taskGroups;
        //}

        [HttpGet]
        [Route("api/taskGroups")]
        public async Task<IActionResult> GetAllTaskGroups()
        {
            var userId = _usersService.GetCurrentUserId().Result;
            var taskGroups = await _taskGroupsService.GetTaskGroupsByUserId(userId);

            if (!taskGroups.Any())
            {
                return BadRequest("No existing task groups!");
            }
            return Ok(taskGroups);
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

        //[HttpPost]
        //[Route("api/create/taskGroup")]
        //public async Task<IActionResult> CreateTaskGroup([FromBody] TaskGroup createTaskGroup)
        //{   
        //    var taskGroup = await _taskGroupsService.GetTaskGroupByNameAsync(createTaskGroup.Name);

        //    if (taskGroup != null)
        //    {
        //        return BadRequest("The group already exists");
        //    }

        //    await _taskGroupsService.AddTaskGroupAsync(createTaskGroup);
        //    return Ok(createTaskGroup);
        //}

        [HttpPost]
        [Route("api/create/taskGroup")]
        public async Task<IActionResult> CreateTaskGroup([FromBody] TaskGroupRequestModel taskGroupRequestModel)
        {
            var userId = _usersService.GetCurrentUserId().Result;
            var taskGroup = taskGroupRequestModel.ToCreateTaskGroup(userId);
            var result = await _taskGroupsService.CreateTaskGroup(taskGroup);

            if (result == null)
            {
                return BadRequest("The group already exists");
            }
            else
            {
                return Ok(result);
            }

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