using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
	public interface ICoursesService
	{
		Task<IEnumerable<Course>> GetAllCourses(int specialityId);
		Task<Course> CreateCourse(Course course);
		Task<IEnumerable<Course>> GetCoursesAsync();
		Task<Course?> GetCourseById(int id);
		Task DeleteAsync(Course course);
		Task<Course?> GetCourseByIdAsync(int id);
		Task UpdateCourseAsync(Course course);
	}
}
