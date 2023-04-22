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
    //public async Task<Day> CreateDay(Day day)
    //{
    //    var isExist = await _daysRepository.GetDayByName(day.Name);
    //    if (isExist != null)
    //    {
    //        return null;
    //    }
    //    return await _daysRepository.AddAsync(day);
    //}

    //public Task<Day?> GetDayById(int id)
    //{
    //    return _daysRepository.FindDay(id);
    //}
    public Task<Day?> GetDayById(int id)
    {
        return _daysRepository.FindDay(id);
    }

    public async Task<IEnumerable<Day>> GetDaysAsync() => await _daysRepository.GetAllDays();


    //public async Task<Day?> GetDayByNameAsync(string name)
    //{
    //    return await _daysRepository.GetDayByName(name);
    //}

    //public async Task<Day?> GetDayByTaskIdAsync(Task<int?> id) => await _daysRepository.FindAsync(id);
    //public Task DeleteAsync(Day day)
    //{
    //    return _daysRepository.DeleteAsync(day);
    //}

    //public async Task<IEnumerable<Day>> GetDaysByUserId(string? id)
    //{
    //    return await _daysRepository.GetDaysByUserId(id);
    //}
}