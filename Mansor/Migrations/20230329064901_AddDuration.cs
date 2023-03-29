using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mansor.Migrations
{
    public partial class AddDuration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "TimeTableItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "TimeTableItems");
        }
    }
}
