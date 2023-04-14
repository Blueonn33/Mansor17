namespace Mansor.Data.Models
{
    public class Day
    {
        public Day()
        {
            Name = Guid.NewGuid().ToString();
            UserDays = new List<UserDay>();
        }
        public Day(string name) : this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserDay> UserDays { get; set; } = null!;
    }
}
