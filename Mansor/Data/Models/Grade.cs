using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
	public class Grade
	{
		public Grade()
		{
			Value = Guid.NewGuid().ToString();
			Content = String.Empty;
		}

		public Grade(Student? student, string value, string content) : this()
		{
			_student = student;
			Value = value ?? throw new ArgumentNullException(nameof(value));
			Content = content;
		}
		public int Id { get; set; }
		public int StudentId { get; set; }
		public Student? _student;
		public Student Student;
		public string Value { get; set; }
		public string Content { get; set; }
	}
}