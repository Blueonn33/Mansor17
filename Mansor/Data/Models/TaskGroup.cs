using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mansor.Data.Models
{
    public class TaskGroup
    {
        public TaskGroup()
        {
            Name = Guid.NewGuid().ToString();
            TaskItems = new List<TaskItem>();
			Literatures = new List<Literature>();
			Grades = new List<Grade>();
		}
        public TaskGroup(Semester? semester, string name) : this()
        {
            _semester = semester;
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }
        public int Id { get; set; }

        public string Name { get; set; }
        public Semester? _semester;
        public int? SemesterId { get; set; }
        public Semester Semester;
        public ICollection<TaskItem> TaskItems { get; set; }
		public ICollection<Literature> Literatures { get; set; }
		public ICollection<Grade> Grades { get; set; }
	}
}