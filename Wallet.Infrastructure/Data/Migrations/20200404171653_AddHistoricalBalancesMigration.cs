using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Wallet.Infrastructure.Migrations
{
    public partial class AddHistoricalBalancesMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HistoricalBalances",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    BalanceValue = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalBalances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoricalBalances_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalBalances_UserId",
                table: "HistoricalBalances",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoricalBalances");
        }
    }
}
