using Mansor.Data.Models;

namespace Mansor.Models
{
	public class CourseRequestModel
	{
		public string Value { get; set; }
		public int SpecialityId { get; set; }

		public Course Courses(Speciality Speciality)
		{
			return new Course()
			{
				Value = Value,
				SpecialityId = Speciality.Id,
				Speciality = Speciality
			};
		}
	}
}
