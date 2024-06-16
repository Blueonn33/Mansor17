namespace Mansor.Data.Models
{
    public class Note
    {
        public Note()
        {
            Title = string.Empty;
            Content = string.Empty;
        }

        public Note(User? user, string title, string content) : this()
        {
            _user = user;
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Content = content;
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public User? _user;
        public string? UserId { get; set; }
        public User User;

    }
}
