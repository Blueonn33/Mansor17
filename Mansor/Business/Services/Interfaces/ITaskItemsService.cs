using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
    public interface ITaskItemsService
    {
        Task<IEnumerable<TaskItem>> GetAllItems(int taskGroupId);
        Task<TaskItem> CreateTaskItem(TaskItem taskItem);
        Task<IEnumerable<TaskItem>> GetTaskItemsAsync();
        Task<TaskItem?> GetTaskItemById(int id);
        Task DeleteAsync(TaskItem taskItem);
        Task<TaskItem?> GetTaskItemByIdAsync(int id);
        Task UpdateTaskItemAsync(TaskItem taskItem);
    }
}
