namespace Mansor.Models
{
    using Mansor.Data;
    using Mansor.Data.Models;

    public class TaskGroupRequestModel
    {
        public string Name { get; set; }

        public TaskGroup ToCreateTaskGroup(Semester Semester)
        {
            return new TaskGroup()
            {
                Name = Name,
				SemesterId = Semester.Id,
				Semester = Semester
			};
        }
    }
}