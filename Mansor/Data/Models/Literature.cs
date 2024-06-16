using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Literature
	{
		public Literature()
		{
			Value = string.Empty;
			Keyword = string.Empty;
		}

		public Literature(TaskGroup? taskGroup, string value, string keyword) : this()
		{
			_taskGroup = taskGroup;
			Value = value ?? throw new ArgumentNullException(nameof(value));
			Keyword = keyword ?? throw new ArgumentNullException(nameof(keyword));
		}
		public int Id { get; set; }
		public int TaskGroupId { get; set; }
		public TaskGroup? _taskGroup;
		public TaskGroup TaskGroup;
		public string Value { get; set; }
		public string Keyword { get; set; }
	}
}
