namespace Mansor.Business.Services.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Mansor.Data.Models;

    public interface ISubjectsService
    {
        //Task<IEnumerable<Subject>> GetSubjectsForDay(int dayId);
        Task<IEnumerable<Subject>> GetSubjectsAsync();
        Task<IEnumerable<Subject>> GetSubjectsForDay(int dayId, string userId);
        Task<IEnumerable<Subject>> GetSubjectsByUserId(string? id);
        Task<IEnumerable<Subject>> GetAllSubjects(int dayId);
        Task<Subject> CreateSubject(Subject subject);
        //Task<IEnumerable<string>> GetAllSubjectsAsync(string userId);
        //Task<Subject> CreateSubject(Subject subject);
        //Task<Subject?> GetSubjectByIdAsync(int id);
        //Task DeleteAsync(Subject subject);
    }
}
