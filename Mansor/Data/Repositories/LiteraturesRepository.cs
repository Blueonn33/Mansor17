using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mansor.Data.Repositories
{
	public class LiteraturesRepository : Repository<Literature>, ILiteraturesRepository
	{
		public LiteraturesRepository(ApplicationDbContext context) : base(context)
		{
		}

		public async Task<IEnumerable<Literature>> GetAllLiteraturesAsync(int taskGroupId)
		{
			return await Entities.AsNoTracking().Include(t => t.TaskGroup.Semester)
				.Where(t => t.TaskGroupId == taskGroupId)
				.OrderBy(t => t.Keyword).ToListAsync();
		}
		public async Task<IEnumerable<Literature>> GetAllLiteratures() => await Entities.ToListAsync();

		public async Task<Literature?> FindLiterature(int id)
		{
			return await Entities.Include(t => t.TaskGroup).FirstOrDefaultAsync(t => t.Id == id);
		}
	}
}
