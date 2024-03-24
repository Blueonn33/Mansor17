using Mansor.Data.Models;

namespace Mansor.Models
{
	public class GradeRequestModel
	{
		public string Value { get; set; }
		public int StudentId { get; set; }

		public Grade Grades(Student Student)
		{
			return new Grade()
			{
				Value = Value,
				StudentId = Student.Id,
				Student = Student
			};
		}
	}
}
