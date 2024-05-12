using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface ISemestersRepository : IRepository<Semester>
	{
		Task<IEnumerable<Semester>> GetAllSemestersAsync(int courseId);
		Task<IEnumerable<Semester>> GetAllSemesters();
		Task<Semester?> FindSemester(int id);
	}
}