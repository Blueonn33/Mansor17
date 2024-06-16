using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Course
	{
		public Course()
		{
			Value = string.Empty;
			Semesters = new List<Semester>();
		}

		public Course(Speciality? speciality, string value) : this()
		{
			_speciality = speciality;
			Value = value ?? throw new ArgumentNullException(nameof(value));
		}
		public int Id { get; set; }
		public int SpecialityId { get; set; }
		public Speciality? _speciality;
		public Speciality Speciality;
		public string Value { get; set; }
		public ICollection<Semester> Semesters { get; set; }
	}
}
