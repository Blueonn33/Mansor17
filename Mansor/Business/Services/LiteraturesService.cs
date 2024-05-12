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
	public class LiteraturesService : ILiteraturesService
	{
		private readonly ILiteraturesRepository _literaturesRepository;
		public LiteraturesService(ILiteraturesRepository literaturesRepository)
		{
			_literaturesRepository = literaturesRepository;
		}

		public async Task<Literature> CreateLiterature(Literature literature)
		{
			return await _literaturesRepository.AddAsync(literature);
		}

		public async Task<IEnumerable<Literature>> GetAllLiteratures(int taskGroupId)
		{
			return await _literaturesRepository.GetAllLiteraturesAsync(taskGroupId);
		}

		public async Task<IEnumerable<Literature>> GetLiteraturesAsync() => await _literaturesRepository.GetAllLiteratures();
		public Task<Literature?> GetLiteratureById(int id)
		{
			return _literaturesRepository.FindLiterature(id);
		}
		public Task DeleteAsync(Literature literature)
		{
			return _literaturesRepository.DeleteAsync(literature);
		}
		public async Task<Literature?> GetLiteratureByIdAsync(int id) => await _literaturesRepository.FindAsync(id);
		public async Task UpdateLiteratureAsync(Literature literature) => await _literaturesRepository.UpdateAsync(literature);
	}
}
