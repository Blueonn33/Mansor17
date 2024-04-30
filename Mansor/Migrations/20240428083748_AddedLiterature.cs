using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mansor.Migrations
{
    public partial class AddedLiterature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Literatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskGroupId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Literatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Literatures_TaskGroups_TaskGroupId",
                        column: x => x.TaskGroupId,
                        principalTable: "TaskGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Days",
                columns: new[] { "Id", "Name" },
                values: new object[] { 6, "Събота" });

            migrationBuilder.InsertData(
                table: "Days",
                columns: new[] { "Id", "Name" },
                values: new object[] { 7, "Неделя" });

            migrationBuilder.CreateIndex(
                name: "IX_Literatures_TaskGroupId",
                table: "Literatures",
                column: "TaskGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Literatures");

            migrationBuilder.DeleteData(
                table: "Days",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Days",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
