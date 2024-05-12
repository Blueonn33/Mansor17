using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface IGradesRepository : IRepository<Grade>
	{
		Task<IEnumerable<Grade>> GetAllGradesAsync(int taskGroupId);
		Task<IEnumerable<Grade>> GetAllGrades();
		Task<Grade?> FindGrade(int id);
	}
}
