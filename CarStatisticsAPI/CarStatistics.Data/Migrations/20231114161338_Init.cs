﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarStatistics.Data.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarSpeedStatistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarSpeedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CarSpeed = table.Column<int>(type: "int", nullable: false),
                    CarRegistrationNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
