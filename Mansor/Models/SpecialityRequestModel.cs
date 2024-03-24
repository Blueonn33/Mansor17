namespace Mansor.Models
{
	using Mansor.Data;
	using Mansor.Data.Models;

	public class SpecialityRequestModel
	{
		public string Name { get; set; }

		public Speciality ToCreateSpeciality(string userId)
		{
			return new Speciality()
			{
				Name = Name,
				UserId = userId,
			};
		}
	}
}