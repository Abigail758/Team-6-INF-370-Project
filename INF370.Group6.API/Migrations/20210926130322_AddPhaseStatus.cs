using Microsoft.EntityFrameworkCore.Migrations;

namespace INF370.Group6.API.Migrations
{
    public partial class AddPhaseStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PhaseStatusId",
                table: "Phases",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PhaseStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhaseStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Phases_PhaseStatusId",
                table: "Phases",
                column: "PhaseStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Phases_PhaseStatuses_PhaseStatusId",
                table: "Phases",
                column: "PhaseStatusId",
                principalTable: "PhaseStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Phases_PhaseStatuses_PhaseStatusId",
                table: "Phases");

            migrationBuilder.DropTable(
                name: "PhaseStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Phases_PhaseStatusId",
                table: "Phases");

            migrationBuilder.DropColumn(
                name: "PhaseStatusId",
                table: "Phases");
        }
    }
}
