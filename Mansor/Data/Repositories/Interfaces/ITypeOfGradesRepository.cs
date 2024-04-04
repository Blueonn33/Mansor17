using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface ITypeOfGradesRepository : IRepository<TypeOfGrade>
	{
		Task<IEnumerable<TypeOfGrade>> GetTypeOfGradesByStudentId(int? id);
		Task<int> GetCountAsync();
		Task<IEnumerable<TypeOfGrade>> GetAllTypeOfGrades();
		Task<TypeOfGrade?> GetTypeOfGradeByName(string name);
		Task<TypeOfGrade?> FindTypeOfGrade(int id);
	}
}