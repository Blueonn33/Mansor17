namespace Mansor.Models
{
    using Mansor.Data;
    using Mansor.Data.Models;

    public class TaskGroupRequestModel
    {
        public string Name { get; set; }

        public TaskGroup ToCreateTaskGroup(string userId)
        {
            return new TaskGroup()
            {
                Name = Name,
                UserId = userId,
            };
        }
    }
}