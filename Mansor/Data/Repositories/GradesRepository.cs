using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mansor.Data.Repositories
{
	public class GradesRepository : Repository<Grade>, IGradesRepository
	{
		public GradesRepository(ApplicationDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Grade>> GetAllGradesAsync(int studentId)
		{
			return await Entities.AsNoTracking().Include(t => t.Student.Speciality).Where(t => t.StudentId == studentId)
				.ToListAsync();
		}
		public async Task<IEnumerable<Grade>> GetAllGrades() => await Entities.ToListAsync();

		public async Task<Grade?> FindGrade(int id)
		{
			return await Entities.Include(t => t.Student).FirstOrDefaultAsync(t => t.Id == id);
		}
	}
}
