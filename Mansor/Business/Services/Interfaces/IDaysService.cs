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
        //Task<Day?> GetDayById(int id);
        Task<IEnumerable<Day>> GetDaysAsync();
        Task<Day?> GetDayByIdAsync(int id);
        //Task<Day?> FindDay(int id);
        //Task<Day?> GetDayByTaskIdAsync(Task<int?> id);
        //Task<Day?> GetDayByNameAsync(string name);
    }
}
