using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface ICoursesRepository : IRepository<Course>
	{
		Task<IEnumerable<Course>> GetAllCoursesAsync(int specialityId);
		Task<IEnumerable<Course>> GetAllCourses();
		Task<Course?> FindCourse(int id);
	}
}