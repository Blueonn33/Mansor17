using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
    public class TimeTableItem
    {
        public TimeTableItem()
        {
            Value = Guid.NewGuid().ToString();
        }

        public TimeTableItem(TimeTableDay? timeTableDay, string value, bool deleted = false) : this()
        {
            _timeTableDay = timeTableDay;
            Value = value ?? throw new ArgumentNullException(nameof(value));
            IsDeleted = deleted;
        }
        public int Id { get; set; }
        public int TimeTableDayId { get; set; }
        public TimeTableDay? _timeTableDay;
        public TimeTableDay TimeTableDay;
        public string Value { get; set; }
        public bool IsDeleted { get; set; }
    }
}
