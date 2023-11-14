using CarStatistics.Core.models;
using Microsoft.EntityFrameworkCore;

namespace CarStatistics.Data
{
    public class CarStatisticsDbContext : DbContext, ICarStatisticsDbContext
    {
        public CarStatisticsDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<CarSpeedStatistic> CarSpeedStatistics { get; set; }
        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
    }
}
