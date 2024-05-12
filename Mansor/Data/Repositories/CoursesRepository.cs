using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mansor.Data.Repositories
{
	public class CoursesRepository : Repository<Course>, ICoursesRepository
	{
		public CoursesRepository(ApplicationDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Course>> GetAllCoursesAsync(int specialityId)
		{
			return await Entities.AsNoTracking().Include(t => t.Speciality.User)
				.Where(t => t.SpecialityId == specialityId)
				.OrderBy(t => t.Id).ToListAsync();
		}
		public async Task<IEnumerable<Course>> GetAllCourses() => await Entities.ToListAsync();

		public async Task<Course?> FindCourse(int id)
		{
			return await Entities.Include(t => t.Speciality).FirstOrDefaultAsync(t => t.Id == id);
		}
	}
}
