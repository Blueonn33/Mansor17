using Mansor.Data;
using Mansor.Data.Models;

namespace Mansor.Models
{
    public class SubjectRequestModel
    {
        public string Name { get; set; }
        public string Duration { get; set; }
        public int DayId { get; set; }

        public Subject ToCreateSubject(Day day, string userId)
        {
            return new Subject()
            {
                Name = Name,
                Duration = Duration,
                Day = day,
                DayId = day.Id,
                UserId = userId
            };
        }
    }
}
