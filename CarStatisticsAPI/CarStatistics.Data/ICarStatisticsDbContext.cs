using CarStatistics.Core.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CarStatistics.Data
{
    public interface ICarStatisticsDbContext
    {
        DbSet<T> Set<T>() where T : class;
        EntityEntry<T> Entry<T>(T entity) where T : class;
        DbSet<CarSpeedStatistic> CarSpeedStatistics { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}