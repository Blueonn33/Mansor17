using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
	public interface IGradesService
	{
		Task<IEnumerable<Grade>> GetAllGrades(int taskGroupId);
		Task<Grade> CreateGrade(Grade grade);
		Task<IEnumerable<Grade>> GetGradesAsync();
		Task<Grade?> GetGradeById(int id);
		Task DeleteAsync(Grade grade);
		Task<Grade?> GetGradeByIdAsync(int id);
		Task UpdateGradeAsync(Grade grade);
	}
}

