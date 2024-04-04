using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mansor.Migrations
{
    public partial class TypeOfGrade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_Students_StudentId",
                table: "Grades");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Grades");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "Grades",
                newName: "TypeOfGradeId");

            migrationBuilder.RenameIndex(
                name: "IX_Grades_StudentId",
                table: "Grades",
                newName: "IX_Grades_TypeOfGradeId");

            migrationBuilder.CreateTable(
                name: "TypeOfGrades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeOfGrades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeOfGrades_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TypeOfGrades_StudentId",
                table: "TypeOfGrades",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_TypeOfGrades_TypeOfGradeId",
                table: "Grades",
                column: "TypeOfGradeId",
                principalTable: "TypeOfGrades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_TypeOfGrades_TypeOfGradeId",
                table: "Grades");

            migrationBuilder.DropTable(
                name: "TypeOfGrades");

            migrationBuilder.RenameColumn(
                name: "TypeOfGradeId",
                table: "Grades",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Grades_TypeOfGradeId",
                table: "Grades",
                newName: "IX_Grades_StudentId");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Grades",
                type: "nvarchar(400)",
                maxLength: 400,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_Students_StudentId",
                table: "Grades",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
