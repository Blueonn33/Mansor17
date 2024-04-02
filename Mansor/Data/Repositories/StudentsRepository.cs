using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mansor.Data.Repositories
{
	public class StudentsRepository : Repository<Student>, IStudentsRepository
	{
		public StudentsRepository(ApplicationDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Student>> GetAllStudentsAsync(int specialityId)
		{
			return await Entities.AsNoTracking().Include(t => t.Speciality.User).Where(t => t.SpecialityId == specialityId)
				.ToListAsync();
		}
		public async Task<IEnumerable<Student>> GetAllStudents() => await Entities.ToListAsync();

		public async Task<Student?> FindStudent(int id)
		{
			return await Entities.Include(t => t.Speciality).FirstOrDefaultAsync(t => t.Id == id);
		}
	}
}
