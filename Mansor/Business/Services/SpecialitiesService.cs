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
	public class SpecialitiesService : ISpecialitiesService
	{
		private readonly ISpecialitiesRepository _SpecialitiesRepository;

		public SpecialitiesService(ISpecialitiesRepository SpecialitiesRepository)
		{
			_SpecialitiesRepository = SpecialitiesRepository;
		}

		public Task<Speciality?> GetSpecialityById(int id)
		{
			return _SpecialitiesRepository.FindSpeciality(id);
		}

		public async Task<IEnumerable<Speciality>> GetSpecialitiesByUserId(string? id)
		{
			return await _SpecialitiesRepository.GetSpecialitiesByUserId(id);
		}

		public async Task<Speciality> UpdateSpecialityName(Speciality Speciality)
		{
			var group = await _SpecialitiesRepository.FindSpeciality(Speciality.Id);

			if (group != null)
			{
				if (group.Name == Speciality.Name)
				{
					return null;
				}
				group.Name = Speciality.Name;
				await _SpecialitiesRepository.UpdateAsync(group);
				return group;
			}
			return null;
		}

		public async Task<Speciality> CreateSpeciality(Speciality Speciality)
		{
			var isExist = await _SpecialitiesRepository.GetSpecialityByName(Speciality.Name);
			if (isExist != null)
			{
				return null;
			}
			return await _SpecialitiesRepository.AddAsync(Speciality);
		}


		public async Task AddSpecialityAsync(Speciality Speciality) => await _SpecialitiesRepository.AddAsync(Speciality);

		public async Task<Speciality?> GetSpecialityByNameAsync(string name)
		{
			return await _SpecialitiesRepository.GetSpecialityByName(name);
		}

		public async Task<IEnumerable<Speciality>> GetSpecialitiesAsync() => await _SpecialitiesRepository.GetAllSpecialities();

		public async Task<Speciality?> GetSpecialityByIdAsync(int id) => await _SpecialitiesRepository.FindAsync(id);

		public async Task UpdateSpecialityAsync(Speciality Speciality) => await _SpecialitiesRepository.UpdateAsync(Speciality);
		public Task DeleteAsync(Speciality Speciality)
		{
			return _SpecialitiesRepository.DeleteAsync(Speciality);
		}
	}
}