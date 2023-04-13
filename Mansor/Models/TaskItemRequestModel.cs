using Mansor.Data.Models;

namespace Mansor.Models
{
    public class TaskItemRequestModel
    {
        public string Value { get; set; }
        public int TaskGroupId { get; set; }

        public TaskItem TaskItems(TaskGroup taskGroup)
        {
            return new TaskItem()
            {
                Value = Value,
                TaskGroupId = taskGroup.Id,
                TaskGroup = taskGroup
            };
        }
    }
}
