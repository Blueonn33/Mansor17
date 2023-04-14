using Mansor.Data.Models;

namespace Mansor.Models
{
    public class TaskItemRequestModel
    {
        public string Value { get; set; }
        public string Color { get; set; }
        public int TaskGroupId { get; set; }

        public TaskItem TaskItems(TaskGroup taskGroup)
        {
            return new TaskItem()
            {
                Value = Value,
                Color = Color,
                TaskGroupId = taskGroup.Id,
                TaskGroup = taskGroup
            };
        }
    }
}
