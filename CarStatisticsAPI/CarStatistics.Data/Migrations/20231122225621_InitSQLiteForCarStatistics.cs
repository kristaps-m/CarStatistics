using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarStatistics.Data.Migrations
{
    public partial class InitSQLiteForCarStatistics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarSpeedStatistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CarSpeedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CarSpeed = table.Column<int>(type: "INTEGER", nullable: false),
                    CarRegistrationNumber = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarSpeedStatistics", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarSpeedStatistics");
        }
    }
}
