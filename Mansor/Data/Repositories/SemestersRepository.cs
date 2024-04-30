using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public class SemestersRepository : Repository<Semester>, ISemestersRepository
	{
		public SemestersRepository(ApplicationDbContext context) : base(context)
		{
		}
		public async Task<IEnumerable<Semester>> GetAllSemestersAsync(int courseId)
		{
			return await Entities.AsNoTracking().Include(t => t.Course.Speciality)
				.Where(t => t.CourseId == courseId)
				.OrderBy(t => t.Id).ToListAsync();
		}
		public async Task<IEnumerable<Semester>> GetAllSemesters() => await Entities.ToListAsync();

		public async Task<Semester?> FindSemester(int id)
		{
			return await Entities.Include(t => t.Course).FirstOrDefaultAsync(t => t.Id == id);
		}
	}
}
