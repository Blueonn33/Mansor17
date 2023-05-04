namespace Mansor.Data.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Mansor.Data.Models;
    using Mansor.Data.Repositories.Interfaces;

    public class SubjectsRepository : Repository<Subject>, ISubjectsRepository
    {
        public  SubjectsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Subject>> GetAllSubjects() => await Entities.OrderBy(t => t.DayId)
            .ThenBy(t => t.Duration).ToListAsync();

        public async Task<IEnumerable<Subject>> GetAllSubjectsByDayAsync(int dayId)
        {
            return await Entities.Include(t => t.Day).Where(t => t.DayId == dayId)
                .ToListAsync();
        }
        public async Task<IEnumerable<Subject>> GetAllSubjectsAsync(int dayId, string? userId)
        {
            return await Entities.Include(t => t.Day).Include(t => t.User)
               .Where(t => t.DayId == dayId && t.UserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Subject>> GetSubjectsByUserId(string? Id)
        {
            return await Entities.Include(t => t.User).Where(t => t.UserId == Id).ToListAsync();
        }
    }
}
