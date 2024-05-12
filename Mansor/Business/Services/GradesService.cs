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
	public class GradesService : IGradesService
	{
		private readonly IGradesRepository _gradesRepository;
		public GradesService(IGradesRepository gradesRepository)
		{
			_gradesRepository = gradesRepository;
		}

		public async Task<Grade> CreateGrade(Grade grade)
		{
			return await _gradesRepository.AddAsync(grade);
		}

		public async Task<IEnumerable<Grade>> GetAllGrades(int taskGroupId)
		{
			return await _gradesRepository.GetAllGradesAsync(taskGroupId);
		}

		public async Task<IEnumerable<Grade>> GetGradesAsync() => await _gradesRepository.GetAllGrades();
		public Task<Grade?> GetGradeById(int id)
		{
			return _gradesRepository.FindGrade(id);
		}
		public Task DeleteAsync(Grade grade)
		{
			return _gradesRepository.DeleteAsync(grade);
		}
		public async Task<Grade?> GetGradeByIdAsync(int id) => await _gradesRepository.FindAsync(id);
		public async Task UpdateGradeAsync(Grade grade) => await _gradesRepository.UpdateAsync(grade);
	}
}
