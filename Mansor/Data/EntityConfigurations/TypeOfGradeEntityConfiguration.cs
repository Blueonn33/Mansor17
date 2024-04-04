using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mansor.Data.EntityConfigurations
{
	public class TypeOfGradeEntityConfiguration : IEntityTypeConfiguration<TypeOfGrade>
	{
		public void Configure(EntityTypeBuilder<TypeOfGrade> builder)
		{
			builder.ToTable("TypeOfGrades");

			builder.HasKey(p => p.Id);
			builder.Property(p => p.Name).HasMaxLength(255);

			builder.HasOne(tg => tg.Student)
				.WithMany(u => u.TypeOfGrades)
				.HasForeignKey(u => u.StudentId);

			builder.HasMany(tg => tg.Grades)
				 .WithOne(ti => ti.TypeOfGrade)
				 .HasForeignKey(ti => ti.TypeOfGradeId);

		}
	}
}
