using CarStatistics.Core.Interfaces;
using CarStatistics.Data;
using CarStatistics.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CarStatisticsDbContext>(x => x.UseSqlite(connectionString));
//builder.Services.AddDbContext<CarStatisticsDbContext>(x => x.UseSqlServer(connectionString));

builder.Services.AddScoped<ICarStatisticsDbContext, CarStatisticsDbContext>();
builder.Services.AddScoped<IDbService, DbService>();
builder.Services.AddScoped<ICarSpeedStatisticService, CarSpeedStatisticService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
