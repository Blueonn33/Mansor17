using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public class SpecialitiesRepository : Repository<Speciality>, ISpecialitiesRepository
	{
		public SpecialitiesRepository(ApplicationDbContext context) : base(context)
		{
		}
		public async Task<IEnumerable<Speciality>> GetSpecialitiesByUserId(string? Id)
		{
			return await Entities.Include(t => t.User).Where(t => t.UserId == Id).ToListAsync();
		}

		public async Task<Speciality?> FindSpeciality(int id)
		{
			return await Entities.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);
		}

		public async Task<IEnumerable<Speciality>> GetAllSpecialities() => await Entities.ToListAsync();

		public async Task<int> GetCountAsync() => await Entities.CountAsync();

		public async Task<Speciality?> GetSpecialityByName(string name)
		{
			return await Entities.FirstOrDefaultAsync(t => t.Name == name);
		}
	}
}
