using Microsoft.EntityFrameworkCore;
using Mansor.Data.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Identity;
using Mansor.Data.EntityConfigurations;

namespace Mansor.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<TaskGroup> TaskGroups => Set<TaskGroup>();
        public DbSet<TaskItem> TaskItems => Set<TaskItem>();
        public DbSet<Note> Note => Set<Note>();
        public DbSet<TimeTableDay> TimeTableDay => Set<TimeTableDay>();
        public DbSet<TimeTableItem> TimeTableItem => Set<TimeTableItem>();

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().ToTable("Users");
            builder.Entity<IdentityRole>().ToTable(name: "Roles");
            builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");

            builder.ApplyConfiguration(new TaskGroupEntityConfiguration());
            builder.ApplyConfiguration(new TaskItemEntityConfiguration());
            builder.ApplyConfiguration(new NoteEntityConfiguration());
            builder.ApplyConfiguration(new UserEntityConfiguration());
            builder.ApplyConfiguration(new TimeTableDayEntityConfiguration());
            builder.ApplyConfiguration(new TimeTableItemEntityConfiguration());

        }
    }
}