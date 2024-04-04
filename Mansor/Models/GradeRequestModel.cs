using Mansor.Data.Models;

namespace Mansor.Models
{
	public class GradeRequestModel
	{
		public string Value { get; set; }
		public int TypeOfGradeId { get; set; }

		public Grade Grades(TypeOfGrade TypeOfGrade)
		{
			return new Grade()
			{
				Value = Value,
				TypeOfGradeId = TypeOfGrade.Id,
				TypeOfGrade = TypeOfGrade
			};
		}
	}
}
