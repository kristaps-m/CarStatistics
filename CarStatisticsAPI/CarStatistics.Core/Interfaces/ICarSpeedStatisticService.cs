using CarStatistics.Core.models;
using CarStatistics.Core.Models;

namespace CarStatistics.Core.Interfaces
{
    public interface ICarSpeedStatisticService : IEntityService<CarSpeedStatistic>
    {
        List<Yolo> GetTheThings(DateTime searchData);
    }
}
