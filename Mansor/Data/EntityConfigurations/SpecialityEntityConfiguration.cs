using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mansor.Data.EntityConfigurations
{
	public class SpecialityEntityConfiguration : IEntityTypeConfiguration<Speciality>
	{
		public void Configure(EntityTypeBuilder<Speciality> builder)
		{
			builder.ToTable("Specialities");

			builder.HasKey(p => p.Id);
			builder.Property(p => p.Name).HasMaxLength(255);

			builder.HasOne(tg => tg.User)
				.WithMany(u => u.Specialities)
				.HasForeignKey(u => u.UserId);

			builder.HasMany(tg => tg.Students)
				 .WithOne(ti => ti.Speciality)
				 .HasForeignKey(ti => ti.SpecialityId);

		}
	}
}
