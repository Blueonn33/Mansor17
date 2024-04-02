using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
	public interface IStudentsService
	{
		Task<IEnumerable<Student>> GetAllStudents(int specialityId);
		Task<Student> CreateStudent(Student student);
		Task<IEnumerable<Student>> GetStudentsAsync();
		Task<Student?> GetStudentById(int id);
		Task DeleteAsync(Student student);
		Task<Student?> GetStudentByIdAsync(int id);
		Task UpdateStudentAsync(Student student);
	}
}
