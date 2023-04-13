using System.ComponentModel.DataAnnotations;

namespace Mansor.Data.Models
{
    public class Subject
    {
        public Subject()
        {
            Name = Guid.NewGuid().ToString();
            Duration = string.Empty;
        }

        public Subject(User? user, Day? day, string name, string duration) : this()
        {
            _user = user;
            _day = day;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Duration = duration;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; }
        public string UserId { get; set; }
        public User? _user;
        public User User { get; set; }
        public int DayId { get; set; }
        public Day? _day;
        public Day Day { get; set; }
    }
}
