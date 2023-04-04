namespace Mansor.Models
{
    using Mansor.Data;
    using Mansor.Data.Models;
    public class TimeTableDayRequestModel
    {
        public string Name { get; set; }

        public TimeTableDay ToCreateDay(string userId)
        {
            return new TimeTableDay()
            {
                Name = Name,
                UserId = userId,
            };
        }
    }
}
