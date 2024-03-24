using Mansor.Data.Models;

namespace Mansor.Models
{
	public class StudentRequestModel
	{
		public string Name { get; set; }
		public int SpecialityId { get; set; }

		public Student Students(Speciality Speciality)
		{
			return new Student()
			{
				Name = Name,
				SpecialityId = Speciality.Id,
				Speciality = Speciality
			};
		}
	}
}
