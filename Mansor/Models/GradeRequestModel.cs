using Mansor.Data.Models;

namespace Mansor.Models
{
	public class GradeRequestModel
	{
		public string Value { get; set; }
		public int StudentId { get; set; }
		public string Content { get; set; }

		public Grade Grades(Student Student)
		{
			return new Grade()
			{
				Value = Value,
				Content = Content,
				StudentId = Student.Id,
				Student = Student
			};
		}
	}
}
