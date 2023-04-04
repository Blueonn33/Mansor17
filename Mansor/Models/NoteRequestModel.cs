namespace Mansor.Models
{
    using Mansor.Data;
    using Mansor.Data.Models;

    public class NoteRequestModel
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public Note ToCreateNote(string userId)
        {
            return new Note()
            {
                Title = Title,
                Content = Content,
                UserId = userId,
            };
        }
    }
}