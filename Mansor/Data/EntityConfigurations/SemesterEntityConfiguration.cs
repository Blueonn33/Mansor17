using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mansor.Data.EntityConfigurations
{
	public class SemesterEntityConfiguration : IEntityTypeConfiguration<Semester>
	{
		public void Configure(EntityTypeBuilder<Semester> builder)
		{
			builder.ToTable("Semesters");

			builder.HasKey(p => p.Id);
			builder.Property(p => p.Value).HasMaxLength(255);

			builder.HasOne(tg => tg.Course)
				.WithMany(u => u.Semesters)
				.HasForeignKey(u => u.CourseId);

			builder.HasMany(tg => tg.TaskGroups)
				 .WithOne(ti => ti.Semester)
				 .HasForeignKey(ti => ti.SemesterId);

		}
	}
}
