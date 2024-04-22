using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Business.Services
{
    public class TaskGroupsService : ITaskGroupsService
    {
        private readonly ITaskGroupsRepository _taskGroupsRepository;

        public TaskGroupsService(ITaskGroupsRepository taskGroupsRepository)
        {
            _taskGroupsRepository = taskGroupsRepository;
        }

		public async Task<TaskGroup> CreateTaskGroup(TaskGroup taskGroup)
		{
			return await _taskGroupsRepository.AddAsync(taskGroup);
		}

		public async Task<IEnumerable<TaskGroup>> GetAllTaskGroups(int semesterId)
		{
			return await _taskGroupsRepository.GetAllTaskGroupsAsync(semesterId);
		}

		public async Task<IEnumerable<TaskGroup>> GetTaskGroupsAsync() => await _taskGroupsRepository.GetAllTaskGroups();
		public Task<TaskGroup?> GetTaskGroupById(int id)
		{
			return _taskGroupsRepository.FindTaskGroup(id);
		}
		public Task DeleteAsync(TaskGroup taskGroup)
		{
			return _taskGroupsRepository.DeleteAsync(taskGroup);
		}
		public async Task<TaskGroup?> GetTaskGroupByIdAsync(int id) => await _taskGroupsRepository.FindAsync(id);
		public async Task UpdateTaskGroupAsync(TaskGroup taskGroup) => await _taskGroupsRepository.UpdateAsync(taskGroup);

        public async Task<TaskGroup> UpdateTaskGroupName(TaskGroup taskGroup)
        {
            var group = await _taskGroupsRepository.FindTaskGroup(taskGroup.Id);

            if (group != null)
            {
                if (group.Name == taskGroup.Name)
                {
                    return null;
                }
                group.Name = taskGroup.Name;
                await _taskGroupsRepository.UpdateAsync(group);
                return group;
            }
            return null; 
        }
    }
}