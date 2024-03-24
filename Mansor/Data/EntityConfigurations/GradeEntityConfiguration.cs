using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mansor.Data.Models;

namespace Mansor.Data.EntityConfigurations
{
	public class GradeEntityConfiguration : IEntityTypeConfiguration<Grade>
	{
		public void Configure(EntityTypeBuilder<Grade> builder)
		{
			builder.ToTable("Grades");

			builder.HasKey(t => t.Id);
			builder.Property(t => t.Value).HasMaxLength(255);

			builder.HasOne(r => r.Student)
				.WithMany(ti => ti.Grades)
				.HasForeignKey(r => r.StudentId);
		}
	}
}
