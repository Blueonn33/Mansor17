using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mansor.Business.Services.Interfaces
{
	public interface ITypeOfGradesService
	{
		Task<IEnumerable<TypeOfGrade>> GetTypeOfGradesAsync();
		Task<IEnumerable<TypeOfGrade>> GetTypeOfGradesByStudentId(int? id);
		Task<TypeOfGrade?> GetTypeOfGradeById(int id);
		Task<TypeOfGrade> CreateTypeOfGrade(TypeOfGrade typeOfGrade);
		Task<TypeOfGrade?> GetTypeOfGradeByNameAsync(string name);
		Task AddTypeOfGradeAsync(TypeOfGrade typeOfGrade);
		Task<TypeOfGrade?> GetTypeOfGradeByIdAsync(int id);
		Task UpdateTypeOfGradeAsync(TypeOfGrade typeOfGrade);
		Task DeleteAsync(TypeOfGrade typeOfGrade);
	}
}