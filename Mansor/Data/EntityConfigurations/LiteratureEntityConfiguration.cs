using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mansor.Data.Models;

namespace Mansor.Data.EntityConfigurations
{
	public class LiteratureEntityConfiguration : IEntityTypeConfiguration<Literature>
	{
		public void Configure(EntityTypeBuilder<Literature> builder)
		{
			builder.ToTable("Literatures");

			builder.HasKey(t => t.Id);
			builder.Property(t => t.Value).HasMaxLength(255);
			builder.Property(t => t.Keyword).HasMaxLength(255);

			builder.HasOne(r => r.TaskGroup)
				.WithMany(ti => ti.Literatures)
				.HasForeignKey(r => r.TaskGroupId);
		}
	}
}
