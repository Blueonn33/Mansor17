using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mansor.Business.Services.Interfaces
{
	public interface ISpecialitiesService
	{
		Task<IEnumerable<Speciality>> GetSpecialitiesAsync();
		Task<IEnumerable<Speciality>> GetSpecialitiesByUserId(string? id);
		Task<Speciality?> GetSpecialityById(int id);
		Task<Speciality> UpdateSpecialityName(Speciality Speciality);
		Task<Speciality> CreateSpeciality(Speciality Speciality);
		Task<Speciality?> GetSpecialityByNameAsync(string name);
		Task AddSpecialityAsync(Speciality Speciality);
		Task<Speciality?> GetSpecialityByIdAsync(int id);
		Task UpdateSpecialityAsync(Speciality Speciality);
		Task DeleteAsync(Speciality Speciality);
	}
}