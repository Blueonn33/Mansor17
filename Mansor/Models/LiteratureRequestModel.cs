using Mansor.Data.Models;

namespace Mansor.Models
{
	public class LiteratureRequestModel
	{
		public string Value { get; set; }
		public string Keyword { get; set; }
		public int TaskGroupId { get; set; }

		public Literature Literatures(TaskGroup taskGroup)
		{
			return new Literature()
			{
				Value = Value,
				Keyword = Keyword,
				TaskGroupId = taskGroup.Id,
				TaskGroup = taskGroup
			};
		}
	}
}
