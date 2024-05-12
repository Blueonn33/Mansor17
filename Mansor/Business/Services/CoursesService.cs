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
	public class CoursesService : ICoursesService
	{
		private readonly ICoursesRepository _coursesRepository;
		public CoursesService(ICoursesRepository coursesRepository)
		{
			_coursesRepository = coursesRepository;
		}

		public async Task<Course> CreateCourse(Course course)
		{
			return await _coursesRepository.AddAsync(course);
		}

		public async Task<IEnumerable<Course>> GetAllCourses(int specialityId)
		{
			return await _coursesRepository.GetAllCoursesAsync(specialityId);
		}

		public async Task<IEnumerable<Course>> GetCoursesAsync() => await _coursesRepository.GetAllCourses();
		public Task<Course?> GetCourseById(int id)
		{
			return _coursesRepository.FindCourse(id);
		}
		public Task DeleteAsync(Course course)
		{
			return _coursesRepository.DeleteAsync(course);
		}
		public async Task<Course?> GetCourseByIdAsync(int id) => await _coursesRepository.FindAsync(id);
		public async Task UpdateCourseAsync(Course course) => await _coursesRepository.UpdateAsync(course);
	}
}
