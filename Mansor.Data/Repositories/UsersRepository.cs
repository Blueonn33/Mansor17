using Mansor.Data.Models;
using Mansor.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mansor.Data.Repositories
{
    public class UsersRepository : Repository<User>, IUsersRepository
    {
        private readonly ApplicationDbContext _context;

        public UsersRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await Entities.ToListAsync();
            return users;
        }
        public User GetUserByEmail(string email)
        {
            return Entities.AsNoTracking().FirstOrDefault(u => u.Email == email);
        }
    }
}