using Mansor.Data.Models;

namespace Mansor.Models
{
	public class GradeRequestModel
	{
		public string Value { get; set; }
		public int TaskGroupId { get; set; }

		public Grade Grades(TaskGroup taskGroup)
		{
			return new Grade()
			{
				Value = Value,
				TaskGroupId = taskGroup.Id,
				TaskGroup = taskGroup
			};
		}
	}
}
