using Mansor.Business.Services.Interfaces;
using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;

namespace Mansor.Business.Services;

public class TimeTableDaysService : ITimeTableDaysService
{
    private readonly ITimeTableDaysRepository _timeTableDaysRepository;

    public TimeTableDaysService(ITimeTableDaysRepository timeTableDaysRepository)
    {
        _timeTableDaysRepository = timeTableDaysRepository;
    }
    public async Task<TimeTableDay> CreateDay(TimeTableDay timeTableDay)
    {
        var isExist = await _timeTableDaysRepository.GetDayByName(timeTableDay.Name);
        if (isExist != null)
        {
            return null;
        }
        return await _timeTableDaysRepository.AddAsync(timeTableDay);
    }

    public Task<TimeTableDay?> GetDayById(int id)
    {
        return _timeTableDaysRepository.FindDay(id);
    }
    public async Task<IEnumerable<TimeTableDay>> GetDaysAsync() => await _timeTableDaysRepository.GetAllDays();

    public async Task<TimeTableDay?> GetDayByIdAsync(int id) => await _timeTableDaysRepository.FindAsync(id);

    public async Task AddDayAsync(TimeTableDay timeTableDay) => await _timeTableDaysRepository.AddAsync(timeTableDay);

    public async Task<TimeTableDay?> GetDayByNameAsync(string name)
    {
        return await _timeTableDaysRepository.GetDayByName(name);
    }

    public async Task<TimeTableDay?> GetDayByTaskIdAsync(Task<int?> id) => await _timeTableDaysRepository.FindAsync(id);
    public Task DeleteAsync(TimeTableDay timeTableDay)
    {
        return _timeTableDaysRepository.DeleteAsync(timeTableDay);
    }

    public async Task<IEnumerable<TimeTableDay>> GetDaysByUserId(string? id)
    {
        return await _timeTableDaysRepository.GetDaysByUserId(id);
    }
}