using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mansor.Migrations
{
    public partial class CoursesSemesters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskGroups_Users_UserId",
                table: "TaskGroups");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropTable(
                name: "TypeOfGrades");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropIndex(
                name: "IX_TaskGroups_UserId",
                table: "TaskGroups");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TaskGroups");

            migrationBuilder.AddColumn<int>(
                name: "SemesterId",
                table: "TaskGroups",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialityId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Semesters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semesters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Semesters_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskGroups_SemesterId",
                table: "TaskGroups",
                column: "SemesterId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_SpecialityId",
                table: "Courses",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Semesters_CourseId",
                table: "Semesters",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskGroups_Semesters_SemesterId",
                table: "TaskGroups",
                column: "SemesterId",
                principalTable: "Semesters",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskGroups_Semesters_SemesterId",
                table: "TaskGroups");

            migrationBuilder.DropTable(
                name: "Semesters");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_TaskGroups_SemesterId",
                table: "TaskGroups");

            migrationBuilder.DropColumn(
                name: "SemesterId",
                table: "TaskGroups");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "TaskGroups",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialityId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TypeOfGrades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeOfGradeId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grades_TypeOfGrades_TypeOfGradeId",
                        column: x => x.TypeOfGradeId,
                        principalTable: "TypeOfGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskGroups_UserId",
                table: "TaskGroups",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Grades_TypeOfGradeId",
                table: "Grades",
                column: "TypeOfGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_SpecialityId",
                table: "Students",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_TypeOfGrades_StudentId",
                table: "TypeOfGrades",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskGroups_Users_UserId",
                table: "TaskGroups",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
