using CarStatistics.Core.Interfaces;
using CarStatistics.Core.models;
using CarStatistics.Core.Models;
using CarStatistics.Data;

namespace CarStatistics.Services
{
    public class CarSpeedStatisticService: EntityService<CarSpeedStatistic>, ICarSpeedStatisticService
    {
        public CarSpeedStatisticService(ICarStatisticsDbContext context) : base(context)
        {
            
        }

        public List<CarSpeedStatistic> FilterBySpeedDatefromDateuntil(int? speed, DateTime? dateFrom, DateTime? dateUntil)
        {
            IQueryable<CarSpeedStatistic> resultQuery = _context.CarSpeedStatistics;

            if (speed.HasValue)
            {
                resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeed >= speed.Value);
            }

            if (dateFrom.HasValue)
            {
                resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeedDate.Date >= dateFrom.Value.Date);
            }

            if (dateUntil.HasValue)
            {
                resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeedDate.Date <= dateUntil.Value.Date);
            }
            // If no filters are provided, return the first 1000 records
            if (!speed.HasValue && !dateFrom.HasValue && !dateUntil.HasValue)
            {
                resultQuery = resultQuery.Take(1000);
            }

            return resultQuery.ToList();
        }

        public CarAverageSpeedResultsInDay CalculateAverageSpeedByHourInDay(DateTime dayToGetAvgSpeedResults)
        {
            var result = new CarAverageSpeedResultsInDay
            {
                DateAvgSpeedIsSearched = dayToGetAvgSpeedResults,
                ResultEachHour = new List<SpeedResultEachHour>()
            };

            var hourlySpeeds = _context.CarSpeedStatistics
                .Where(carSpeedStat => carSpeedStat.CarSpeedDate.Date == dayToGetAvgSpeedResults.Date)
                .GroupBy(carSpeedStat => carSpeedStat.CarSpeedDate.Hour)
                .Select(group => new
                {
                    Hour = group.Key,
                    AvgSpeed = Math.Round(group.Average(stat => stat.CarSpeed), 2)
                })
                .ToList();

            if (hourlySpeeds.Count == 0)
            {
                // For each hour of day from 0:00 to 23:00
                for (int i = 0; i <= 23; i++)
                {
                    result.ResultEachHour.Add(new SpeedResultEachHour(i, 0));
                }
            }
            else
            {
                foreach (var hourlySpeed in hourlySpeeds)
                {
                    result.ResultEachHour.Add(new SpeedResultEachHour(hourlySpeed.Hour, hourlySpeed.AvgSpeed));
                }
            }

            return result;
        }

        public CarSpeedStatistic UpdateCarSpeedStatistic(CarSpeedStatistic carSpeedStatistic, int id)
        {
            var carSpeedStatisticToUpdate = _context.CarSpeedStatistics.SingleOrDefault(h => h.Id == id);

            if (carSpeedStatisticToUpdate != null)
            {
                carSpeedStatisticToUpdate.CarSpeedDate = carSpeedStatistic.CarSpeedDate;
                carSpeedStatisticToUpdate.CarSpeed = carSpeedStatistic.CarSpeed;
                carSpeedStatisticToUpdate.CarRegistrationNumber = carSpeedStatistic.CarRegistrationNumber;
                _context.Entry(carSpeedStatisticToUpdate).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }

            return carSpeedStatisticToUpdate;
        }
    }
}
