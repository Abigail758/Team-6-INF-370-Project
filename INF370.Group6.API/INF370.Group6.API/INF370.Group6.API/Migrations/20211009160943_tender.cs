using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace INF370.Group6.API.Migrations
{
    public partial class tender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TenderRequest_Clients_ClientId",
                table: "TenderRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TenderRequest",
                table: "TenderRequest");

            migrationBuilder.RenameTable(
                name: "TenderRequest",
                newName: "TenderRequests");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "TenderRequests",
                newName: "DateSubmitted");

            migrationBuilder.RenameIndex(
                name: "IX_TenderRequest_ClientId",
                table: "TenderRequests",
                newName: "IX_TenderRequests_ClientId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TenderRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenderSource",
                table: "TenderRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TenderRequests",
                table: "TenderRequests",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Tenders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenderName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DateSubmitted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TenderSource = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenderStatusId = table.Column<int>(type: "int", nullable: false),
                    TenderStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdvertisementDocument = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tenders_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tenders_ClientId",
                table: "Tenders",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_TenderRequests_Clients_ClientId",
                table: "TenderRequests",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TenderRequests_Clients_ClientId",
                table: "TenderRequests");

            migrationBuilder.DropTable(
                name: "Tenders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TenderRequests",
                table: "TenderRequests");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "TenderRequests");

            migrationBuilder.DropColumn(
                name: "TenderSource",
                table: "TenderRequests");

            migrationBuilder.RenameTable(
                name: "TenderRequests",
                newName: "TenderRequest");

            migrationBuilder.RenameColumn(
                name: "DateSubmitted",
                table: "TenderRequest",
                newName: "Date");

            migrationBuilder.RenameIndex(
                name: "IX_TenderRequests_ClientId",
                table: "TenderRequest",
                newName: "IX_TenderRequest_ClientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TenderRequest",
                table: "TenderRequest",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TenderRequest_Clients_ClientId",
                table: "TenderRequest",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
