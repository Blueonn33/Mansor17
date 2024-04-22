using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mansor.Business.Services.Interfaces
{
    public interface ITaskGroupsService
    {
		Task<IEnumerable<TaskGroup>> GetAllTaskGroups(int semesterId);
		Task<TaskGroup> CreateTaskGroup(TaskGroup taskGroup);
		Task<IEnumerable<TaskGroup>> GetTaskGroupsAsync();
		Task<TaskGroup?> GetTaskGroupById(int id);
		Task DeleteAsync(TaskGroup taskGroup);
		Task<TaskGroup?> GetTaskGroupByIdAsync(int id);
		Task UpdateTaskGroupAsync(TaskGroup taskGroup);
	}
}