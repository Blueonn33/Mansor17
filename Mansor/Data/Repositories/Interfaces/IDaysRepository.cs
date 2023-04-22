using Mansor.Data.Models;

namespace Mansor.Data.Repositories.Interfaces;

public interface IDaysRepository : IRepository<Day>
{
    //Task<IEnumerable<Day>> GetDaysByUserId(string? id);
    Task<int> GetCountAsync();
    Task<IEnumerable<Day>> GetAllDays();
    Task<Day?> GetDayByName(string name);
    Task<Day?> FindDay(int id);
    //Task<Day?> FindDay(int id);
}