using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;

namespace Mansor.Business.Services;

public class DaysService : IDaysService
{
    private readonly IDaysRepository _daysRepository;

    public DaysService(IDaysRepository daysRepository)
    {
        _daysRepository = daysRepository;
    }

    public async Task<Day?> GetDayByIdAsync(int id) => await _daysRepository.FindAsync(id);
    public Task<Day?> GetDayById(int id)
    {
        return _daysRepository.FindDay(id);
    }

    public async Task<IEnumerable<Day>> GetDaysAsync() => await _daysRepository.GetAllDays();
}