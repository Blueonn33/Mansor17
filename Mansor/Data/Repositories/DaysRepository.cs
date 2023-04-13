using Microsoft.EntityFrameworkCore;
using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using Mansor.Data.Repositories;
using Mansor.Data;

namespace Mansor.Data.Repositories
{
    public class DaysRepository : Repository<Day>, IDaysRepository
    {
        public DaysRepository(ApplicationDbContext context) : base(context)
        {
        }

        //public async Task<IEnumerable<Day>> GetDaysByUserId(string? Id)
        //{
        //    return await Entities.Include(t => t.User).Where(t => t.UserId == Id).ToListAsync();
        //}
        public async Task<int> GetCountAsync() => await Entities.CountAsync();

        public async Task<IEnumerable<Day>> GetAllDays() => await Entities.ToListAsync();

        public async Task<Day?> GetDayByName(string name)
        {
            return await Entities.FirstOrDefaultAsync(t => t.Name == name);
        }
        //public async Task<Day?> FindDay(int id)
        //{
        //    return await Entities.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);
        //}
    }
}
