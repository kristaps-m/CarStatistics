using CarStatistics.Core.models;
using CarStatistics.Core.Models;

namespace CarStatistics.Core.Interfaces
{
    public interface ICarSpeedStatisticService : IEntityService<CarSpeedStatistic>
    {
        CarAverageSpeedResultsInDay CalculateAverageSpeedByHourInDay(DateTime searchData);
        List<CarSpeedStatistic> FilterBySpeedDatefromDateuntil(int? speed, DateTime? dateFrom, DateTime? dateUntil);
        CarSpeedStatistic UpdateCarSpeedStatistic(CarSpeedStatistic carSpeedStatistic, int id);
    }
}
