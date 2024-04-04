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
        public DbSet<Note> Notes => Set<Note>();
        public DbSet<Day> Days => Set<Day>();
        public DbSet<Subject> Subjects => Set<Subject>();
		public DbSet<Speciality> Specialities => Set<Speciality>();
		public DbSet<Student> Students => Set<Student>();
		public DbSet<Grade> Grades => Set<Grade>();
		public DbSet<TypeOfGrade> TypeOfGrades => Set<TypeOfGrade>();

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
            builder.ApplyConfiguration(new DayEntityConfiguration());
            builder.ApplyConfiguration(new SubjectEntityConfiguration());
			builder.ApplyConfiguration(new SpecialityEntityConfiguration());
			builder.ApplyConfiguration(new StudentEntityConfiguration());
			builder.ApplyConfiguration(new GradeEntityConfiguration());

			SeedInitialData(builder);
        }

        private void SeedInitialData(ModelBuilder builder)
        {
            //Seed Days
            builder.Entity<Day>().HasData(
                new Day { Id = 1, Name = "Понеделник" },
                new Day { Id = 2, Name = "Вторник" },
                new Day { Id = 3, Name = "Сряда" },
                new Day { Id = 4, Name = "Четвъртък" },
                new Day { Id = 5, Name = "Петък" }
                );
        }
    }
}