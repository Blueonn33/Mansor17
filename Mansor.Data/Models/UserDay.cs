namespace Mansor.Data.Models
{
    public class UserDay
    {
        public UserDay()
        {
            Users = new List<User>();
        }
        public int Id { get; set; }
        public int DayId { get; set; }

        private Day? _day;
        public Day Day
        {
            get => _day ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Day));
            set => _day = value;
        }
        public ICollection<User> Users { get; set; }
    }
}
