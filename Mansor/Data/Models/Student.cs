using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Student
	{
		public Student()
		{
			Name = Guid.NewGuid().ToString();
			Grades = new List<Grade>();
		}

		public Student(Speciality? speciality, string name) : this()
		{
			_speciality = speciality;
			Name = name ?? throw new ArgumentNullException(nameof(name));
		}
		public int Id { get; set; }
		public int SpecialityId { get; set; }
		public Speciality? _speciality;
		public Speciality Speciality;
		public string Name { get; set; }
		public ICollection<Grade> Grades { get; set; }
	}
}
