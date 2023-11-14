using CarStatistics.Core.Interfaces;
using CarStatistics.Core.models;
using CarStatistics.Data;

namespace CarStatistics.Services
{
    public class CarSpeedStatisticService: EntityService<CarSpeedStatistic>, ICarSpeedStatisticService
    {
        public CarSpeedStatisticService(ICarStatisticsDbContext context) : base(context)
        {
            
        }
    }
}
