using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace INF370.Group6.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RentalRequestStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status_Type = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalRequestStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RentalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusType = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RentalRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RentalRequestStatusId = table.Column<int>(type: "int", nullable: false),
                    RentalItem = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    RequestDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalRequests_RentalRequestStatuses_RentalRequestStatusId",
                        column: x => x.RentalRequestStatusId,
                        principalTable: "RentalRequestStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rentals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RentalStatusId = table.Column<int>(type: "int", nullable: false),
                    RentalName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Rental_Cost = table.Column<int>(type: "int", nullable: false),
                    RentalRequestId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rentals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rentals_RentalRequests_RentalRequestId",
                        column: x => x.RentalRequestId,
                        principalTable: "RentalRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rentals_RentalStatuses_RentalStatusId",
                        column: x => x.RentalStatusId,
                        principalTable: "RentalStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RentalRequests_RentalRequestStatusId",
                table: "RentalRequests",
                column: "RentalRequestStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_RentalRequestId",
                table: "Rentals",
                column: "RentalRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_RentalStatusId",
                table: "Rentals",
                column: "RentalStatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rentals");

            migrationBuilder.DropTable(
                name: "RentalRequests");

            migrationBuilder.DropTable(
                name: "RentalStatuses");

            migrationBuilder.DropTable(
                name: "RentalRequestStatuses");
        }
    }
}
