using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Grade
	{
		public Grade()
		{
			Value = Guid.NewGuid().ToString();
		}

		public Grade(TaskGroup? taskGroup, string value) : this()
		{
			_taskGroup = taskGroup;
			Value = value ?? throw new ArgumentNullException(nameof(value));
		}
		public int Id { get; set; }
		public int TaskGroupId { get; set; }
		public TaskGroup? _taskGroup;
		public TaskGroup TaskGroup;
		public string Value { get; set; }
	}
}
