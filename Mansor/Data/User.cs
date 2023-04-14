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
            TaskGroups = new List<TaskGroup>();
            Notes = new List<Note>();
            Subjects = new List<Subject>();
            UserDays = new List<UserDay>();
        }

        public User(string name) : this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public string Name { get; set; } = null!;
        public ICollection<TaskGroup> TaskGroups { get; set; } = null!;
        public ICollection<Note> Notes { get; set; } = null!;
        public ICollection<Subject> Subjects { get; set; } = null!;
        public ICollection<UserDay> UserDays { get; set; } = null!;
    }
}