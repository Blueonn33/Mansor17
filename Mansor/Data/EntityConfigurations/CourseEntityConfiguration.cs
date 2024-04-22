using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mansor.Data.EntityConfigurations
{
	public class CourseEntityConfiguration : IEntityTypeConfiguration<Course>
	{
		public void Configure(EntityTypeBuilder<Course> builder)
		{
			builder.ToTable("Courses");

			builder.HasKey(p => p.Id);
			builder.Property(p => p.Value).HasMaxLength(255);

			builder.HasOne(tg => tg.Speciality)
				.WithMany(u => u.Courses)
				.HasForeignKey(u => u.SpecialityId);

			builder.HasMany(tg => tg.Semesters)
				 .WithOne(ti => ti.Course)
				 .HasForeignKey(ti => ti.CourseId);

		}
	}
}
