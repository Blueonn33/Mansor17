using Mansor.Data.Models;

namespace Mansor.Models
{
	public class SemesterRequestModel
	{
		public string Value { get; set; }
		public int CourseId { get; set; }

		public Semester Semesters(Course Course)
		{
			return new Semester()
			{
				Value = Value,
				CourseId = Course.Id,
				Course = Course
			};
		}
	}
}
