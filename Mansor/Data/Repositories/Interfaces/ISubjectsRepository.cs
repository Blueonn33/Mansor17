using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
    public interface ISubjectsRepository : IRepository<Subject>
    {
        Task<IEnumerable<Subject>> GetAllSubjects();
        Task<IEnumerable<Subject>> GetAllSubjectsByDayAsync(int dayId);
        Task<IEnumerable<Subject>> GetAllSubjectsAsync(int dayId, string userId);
        Task<IEnumerable<Subject>> GetSubjectsByUserId(string? id);
    }
}