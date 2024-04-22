using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Business.Services
{
	public class SemestersService : ISemestersService
	{
		private readonly ISemestersRepository _semestersRepository;
		public SemestersService(ISemestersRepository semestersRepository)
		{
			_semestersRepository = semestersRepository;
		}

		public async Task<Semester> CreateSemester(Semester semester)
		{
			return await _semestersRepository.AddAsync(semester);
		}

		public async Task<IEnumerable<Semester>> GetAllSemesters(int courseId)
		{
			return await _semestersRepository.GetAllSemestersAsync(courseId);
		}

		public async Task<IEnumerable<Semester>> GetSemestersAsync() => await _semestersRepository.GetAllSemesters();
		public Task<Semester?> GetSemesterById(int id)
		{
			return _semestersRepository.FindSemester(id);
		}
		public Task DeleteAsync(Semester semester)
		{
			return _semestersRepository.DeleteAsync(semester);
		}
		public async Task<Semester?> GetSemesterByIdAsync(int id) => await _semestersRepository.FindAsync(id);
		public async Task UpdateSemesterAsync(Semester semester) => await _semestersRepository.UpdateAsync(semester);
	}
}
