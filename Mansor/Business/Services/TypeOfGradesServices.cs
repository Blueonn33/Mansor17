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
	public class TypeOfGradesService : ITypeOfGradesService
	{
		private readonly ITypeOfGradesRepository _typeOfGradesRepository;

		public TypeOfGradesService(ITypeOfGradesRepository typeOfGradesRepository)
		{
			_typeOfGradesRepository = typeOfGradesRepository;
		}

		public Task<TypeOfGrade?> GetTypeOfGradeById(int id)
		{
			return _typeOfGradesRepository.FindTypeOfGrade(id);
		}

		public async Task<IEnumerable<TypeOfGrade>> GetTypeOfGradesByStudentId(int? id)
		{
			return await _typeOfGradesRepository.GetTypeOfGradesByStudentId(id);
		}

		public async Task<TypeOfGrade> CreateTypeOfGrade(TypeOfGrade typeOfGrade)
		{
			var isExist = await _typeOfGradesRepository.GetTypeOfGradeByName(typeOfGrade.Name);
			if (isExist != null)
			{
				return null;
			}
			return await _typeOfGradesRepository.AddAsync(typeOfGrade);
		}


		public async Task AddTypeOfGradeAsync(TypeOfGrade typeOfGrade) => await _typeOfGradesRepository.AddAsync(typeOfGrade);

		public async Task<TypeOfGrade?> GetTypeOfGradeByNameAsync(string name)
		{
			return await _typeOfGradesRepository.GetTypeOfGradeByName(name);
		}

		public async Task<IEnumerable<TypeOfGrade>> GetTypeOfGradesAsync() => await _typeOfGradesRepository.GetAllTypeOfGrades();

		public async Task<TypeOfGrade?> GetTypeOfGradeByIdAsync(int id) => await _typeOfGradesRepository.FindAsync(id);

		public async Task UpdateTypeOfGradeAsync(TypeOfGrade typeOfGrade) => await _typeOfGradesRepository.UpdateAsync(typeOfGrade);
		public Task DeleteAsync(TypeOfGrade typeOfGrade)
		{
			return _typeOfGradesRepository.DeleteAsync(typeOfGrade);
		}
	}
}