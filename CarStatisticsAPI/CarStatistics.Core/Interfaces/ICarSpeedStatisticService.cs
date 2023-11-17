using CarStatistics.Core.models;
using CarStatistics.Core.Models;

namespace CarStatistics.Core.Interfaces
{
    public interface ICarSpeedStatisticService : IEntityService<CarSpeedStatistic>
    {
        List<CarAverageSpeedResultsInDay> CalculateAverageSpeedByHourInDay(DateTime searchData);
        CarSpeedStatistic UpdateCarSpeedStatistic(CarSpeedStatistic carSpeedStatistic, int id);
    }
}
