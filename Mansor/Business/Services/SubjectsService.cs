namespace Mansor.Business.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Mansor.Business.Services.Interfaces;
    using Mansor.Data.Models;
    using Mansor.Data.Repositories.Interfaces;

    public class SubjectsService : ISubjectsService
    {
        private readonly ISubjectsRepository _subjectsRepository;
        public SubjectsService(ISubjectsRepository subjectsRepository)
        {
            _subjectsRepository = subjectsRepository;
        }

        public async Task<IEnumerable<Subject>> GetSubjectsAsync() => await _subjectsRepository.GetAllSubjects();

        public async Task<IEnumerable<Subject>> GetAllSubjects(int dayId)
        {
            return await _subjectsRepository.GetAllSubjectsByDayAsync(dayId);
        }

        public async Task<IEnumerable<Subject>> GetSubjectsForDay(int dayId, string userId)
        {
            return await _subjectsRepository.GetAllSubjectsAsync(dayId, userId);
        }

        public async Task<IEnumerable<Subject>> GetSubjectsByUserId(string? id)
        {
            return await _subjectsRepository.GetSubjectsByUserId(id);
        }

        public async Task<Subject> CreateSubject(Subject subject)
        {
            return await _subjectsRepository.AddAsync(subject);
        }

        public async Task<Subject?> GetSubjectByIdAsync(int id) => await _subjectsRepository.FindAsync(id);
        public Task DeleteAsync(Subject subject)
        {
            return _subjectsRepository.DeleteAsync(subject);
        }
    }
}
