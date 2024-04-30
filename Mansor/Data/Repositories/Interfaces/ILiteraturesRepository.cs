using Mansor.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories.Interfaces
{
	public interface ILiteraturesRepository : IRepository<Literature>
	{
		Task<IEnumerable<Literature>> GetAllLiteraturesAsync(int taskGroupId);
		Task<IEnumerable<Literature>> GetAllLiteratures();
		Task<Literature?> FindLiterature(int id);
	}
}
