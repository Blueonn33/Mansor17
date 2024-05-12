using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
	public interface ILiteraturesService
	{
		Task<IEnumerable<Literature>> GetAllLiteratures(int taskGroupId);
		Task<Literature> CreateLiterature(Literature literature);
		Task<IEnumerable<Literature>> GetLiteraturesAsync();
		Task<Literature?> GetLiteratureById(int id);
		Task DeleteAsync(Literature literature);
		Task<Literature?> GetLiteratureByIdAsync(int id);
		Task UpdateLiteratureAsync(Literature literature);
	}
}
