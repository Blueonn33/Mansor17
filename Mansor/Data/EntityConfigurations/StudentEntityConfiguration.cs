using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mansor.Data.Models;

namespace Mansor.Data.EntityConfigurations
{
	public class StudentEntityConfiguration : IEntityTypeConfiguration<Student>
	{
		public void Configure(EntityTypeBuilder<Student> builder)
		{
			builder.ToTable("Students");

			builder.HasKey(t => t.Id);
			builder.Property(t => t.Name).HasMaxLength(255);

			builder.HasOne(r => r.Speciality)
				.WithMany(ti => ti.Students)
				.HasForeignKey(r => r.SpecialityId);
		}
	}
}
