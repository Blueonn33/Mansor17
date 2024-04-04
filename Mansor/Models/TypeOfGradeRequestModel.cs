namespace Mansor.Models
{
	using Mansor.Data;
	using Mansor.Data.Models;

	public class TypeOfGradeRequestModel
	{
		public string Name { get; set; }

		public TypeOfGrade ToCreateTypeOfGrade(Student student)
		{
			return new TypeOfGrade()
			{
				Name = Name,
				StudentId = student.Id,
				Student = student
			};
		}
	}
}