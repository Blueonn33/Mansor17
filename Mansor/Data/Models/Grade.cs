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

		public Grade(TypeOfGrade? typeOfGrade, string value) : this()
		{
			_typeOfGrade = typeOfGrade;
			Value = value ?? throw new ArgumentNullException(nameof(value));
		}
		public int Id { get; set; }
		public int TypeOfGradeId { get; set; }
		public TypeOfGrade? _typeOfGrade;
		public TypeOfGrade TypeOfGrade;
		public string Value { get; set; }
	}
}