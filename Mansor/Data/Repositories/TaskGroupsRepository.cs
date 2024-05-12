using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
    public class TaskGroupsRepository : Repository<TaskGroup>, ITaskGroupsRepository
    {
        public TaskGroupsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TaskGroup>> GetAllTaskGroupsAsync(int semesterId)
		{
			return await Entities.AsNoTracking().Include(t => t.Semester.Course)
				.Where(t => t.SemesterId == semesterId)
				.OrderBy(t => t.Id).ToListAsync();
		}

        public async Task<IEnumerable<TaskGroup>> GetTaskGroupsBySemesterId(int? Id)
        {
            return await Entities.Include(t => t.Semester).Where(t => t.SemesterId == Id).ToListAsync();
        }

        public async Task<TaskGroup?> FindTaskGroup(int id)
        {
            return await Entities.Include(t => t.Semester).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<TaskGroup>> GetAllTaskGroups() => await Entities.ToListAsync();

        public async Task<int> GetCountAsync() => await Entities.CountAsync();

        public async Task<TaskGroup?> GetTaskGroupByName(string name)
        {
            return await Entities.FirstOrDefaultAsync(t => t.Name == name);
        }
    }
}
