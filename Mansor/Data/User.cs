using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mansor.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace Mansor.Data
{
    public class User : IdentityUser
    {
        public User()
        {
            Name = string.Empty;
            IsDeleted = false;
            TaskGroups = new List<TaskGroup>();
            Notes = new List<Note>();
            TimeTableDays = new List<TimeTableDay>();
        }

        public User(string name) : this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public string Name { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public ICollection<TaskGroup> TaskGroups { get; set; } = null!;
        public ICollection<Note> Notes { get; set; } = null!;
        public ICollection<TimeTableDay> TimeTableDays { get; set; } = null!;
    }
}