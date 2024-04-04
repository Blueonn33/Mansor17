using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mansor.Data.Models
{
	public class TypeOfGrade
	{
		public TypeOfGrade()
		{
			Name = Guid.NewGuid().ToString();
			Grades = new List<Grade>();
		}
		public TypeOfGrade(Student? student, string name) : this()
		{
			_student = student;
			Name = name ?? throw new ArgumentNullException(nameof(name));
		}
		public int Id { get; set; }

		public string Name { get; set; }
		public Student? _student;
		public int? StudentId { get; set; }
		public Student Student;
		public ICollection<Grade> Grades { get; set; }
	}
}