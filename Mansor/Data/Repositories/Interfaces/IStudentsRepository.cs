using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface IStudentsRepository : IRepository<Student>
	{
		Task<IEnumerable<Student>> GetAllStudentsAsync(int specialityId);
		Task<IEnumerable<Student>> GetAllStudents();
		Task<Student?> FindStudent(int id);
	}
}
