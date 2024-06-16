using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
    public class TaskItem
    {
        public TaskItem()
        {
            Value = string.Empty;
            Color = string.Empty;
        }

        public TaskItem(TaskGroup? taskGroup, string value, string color, bool completed = false) :this()
        {
            _taskGroup = taskGroup;
            Value = value ?? throw new ArgumentNullException(nameof(value));
            Color = color;
        }
        public int Id { get; set; }
        public int TaskGroupId { get; set; }
        public TaskGroup? _taskGroup;
        public TaskGroup TaskGroup;
        public string Value { get; set; }
        public string Color { get; set; }
    }
}
