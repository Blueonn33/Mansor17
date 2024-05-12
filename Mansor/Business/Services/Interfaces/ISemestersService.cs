using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
	public interface ISemestersService
	{
		Task<IEnumerable<Semester>> GetAllSemesters(int courseId);
		Task<Semester> CreateSemester(Semester semester);
		Task<IEnumerable<Semester>> GetSemestersAsync();
		Task<Semester?> GetSemesterById(int id);
		Task DeleteAsync(Semester semester);
		Task<Semester?> GetSemesterByIdAsync(int id);
		Task UpdateSemesterAsync(Semester semester);
	}
}
