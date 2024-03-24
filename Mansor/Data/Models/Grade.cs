using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Grade
	{
		public Grade()
		{
			Value = Guid.NewGuid().ToString();
		}

		public Grade(Student? student, string value) : this()
		{
			_student = student;
			Value = value ?? throw new ArgumentNullException(nameof(value));
		}
		public int Id { get; set; }
		public int StudentId { get; set; }
		public Student? _student;
		public Student Student;
		public string Value { get; set; }
	}
}