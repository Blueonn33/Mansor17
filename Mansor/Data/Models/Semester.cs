using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Semester
	{
		public Semester()
		{
			Value = Guid.NewGuid().ToString();
			TaskGroups = new List<TaskGroup>();
		}

		public Semester(Course? course, string value) : this()
		{
			_course = course;
			Value = value ?? throw new ArgumentNullException(nameof(value));
		}
		public int Id { get; set; }
		public int CourseId { get; set; }
		public Course? _course;
		public Course Course;
		public string Value { get; set; }
		public ICollection<TaskGroup> TaskGroups { get; set; }
	}
}
