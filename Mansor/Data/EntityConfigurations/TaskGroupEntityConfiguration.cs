using Mansor.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mansor.Data.EntityConfigurations
{
    public class TaskGroupEntityConfiguration : IEntityTypeConfiguration<TaskGroup>
    {
        public void Configure(EntityTypeBuilder<TaskGroup> builder)
        {
            builder.ToTable("TaskGroups");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name).HasMaxLength(255);

            builder.HasOne(tg => tg.Semester)
                .WithMany(u => u.TaskGroups)
                .HasForeignKey(u => u.SemesterId);

            builder.HasMany(tg => tg.TaskItems)
                 .WithOne(ti => ti.TaskGroup)
                 .HasForeignKey(ti => ti.TaskGroupId);

			builder.HasMany(tg => tg.Literatures)
				 .WithOne(ti => ti.TaskGroup)
				 .HasForeignKey(ti => ti.TaskGroupId);

		}
    }
}
