using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface ISpecialitiesRepository : IRepository<Speciality>
	{
		Task<IEnumerable<Speciality>> GetSpecialitiesByUserId(string? id);
		Task<int> GetCountAsync();
		Task<IEnumerable<Speciality>> GetAllSpecialities();
		Task<Speciality?> GetSpecialityByName(string name);
		Task<Speciality?> FindSpeciality(int id);
	}
}