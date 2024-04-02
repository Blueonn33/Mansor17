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
	public class StudentsService : IStudentsService
	{
		private readonly IStudentsRepository _studentsRepository;
		public StudentsService(IStudentsRepository studentsRepository)
		{
			_studentsRepository = studentsRepository;
		}

		public async Task<Student> CreateStudent(Student student)
		{
			return await _studentsRepository.AddAsync(student);
		}

		public async Task<IEnumerable<Student>> GetAllStudents(int specialityId)
		{
			return await _studentsRepository.GetAllStudentsAsync(specialityId);
		}

		public async Task<IEnumerable<Student>> GetStudentsAsync() => await _studentsRepository.GetAllStudents();
		public Task<Student?> GetStudentById(int id)
		{
			return _studentsRepository.FindStudent(id);
		}
		public Task DeleteAsync(Student student)
		{
			return _studentsRepository.DeleteAsync(student);
		}
		public async Task<Student?> GetStudentByIdAsync(int id) => await _studentsRepository.FindAsync(id);
		public async Task UpdateStudentAsync(Student student) => await _studentsRepository.UpdateAsync(student);
	}
}
