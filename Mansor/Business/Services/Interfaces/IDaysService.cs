using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mansor.Data.Models;

namespace Mansor.Business.Services.Interfaces
{
    public interface IDaysService
    {
        Task<IEnumerable<Day>> GetDaysAsync();
        Task<Day?> GetDayByIdAsync(int id);
        Task<Day?> GetDayById(int id);
    }
}
