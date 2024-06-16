namespace Mansor.Data.Models
{
    public class Day
    {
        public Day()
        {
            Name = string.Empty;
            Subjects = new List<Subject>();
        }
        public Day(string name) : this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Subject> Subjects { get; set; } = null!;
    }
}
