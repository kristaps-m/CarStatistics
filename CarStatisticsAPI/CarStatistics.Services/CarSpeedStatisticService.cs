using CarStatistics.Core.Interfaces;
using CarStatistics.Core.models;
using CarStatistics.Core.Models;
using CarStatistics.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
                resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeedDate > dateFrom.Value);
            }

            if (dateUntil.HasValue)
            {
                resultQuery = resultQuery.Where(cSpeedStat => cSpeedStat.CarSpeedDate <= dateUntil.Value);
            }
            // If no filters are provided, return the first 1000 records
            if (!speed.HasValue && !dateFrom.HasValue && !dateUntil.HasValue)
            {
                resultQuery = resultQuery.Take(1000);
            }

            return resultQuery.ToList();
        }

        public List<CarAverageSpeedResultsInDay> CalculateAverageSpeedByHourInDay(DateTime dayToGetAvgSpeedResults)
        {
            var result = new List<CarAverageSpeedResultsInDay>();

            foreach (var itemOfOneHour in _carSpeedsForEachHourOfDay)
            {
                foreach (var oneCarStatistic in _context.CarSpeedStatistics)
                {
                    if (oneCarStatistic.CarSpeedDate.Date == dayToGetAvgSpeedResults.Date &&
                        itemOfOneHour.Key == oneCarStatistic.CarSpeedDate.Hour)
                    {
                        itemOfOneHour.Value.Add(oneCarStatistic.CarSpeed);
                    }
                }
            }

            foreach (var item in _carSpeedsForEachHourOfDay)
            {
                if(item.Value.Count != 0)
                {
                    double theAvgSpeed = Math.Round((double)item.Value.Sum() / item.Value.Count, 2);
                    result.Add(new CarAverageSpeedResultsInDay(item.Key, theAvgSpeed));
                }
                else
                {
                    result.Add(new CarAverageSpeedResultsInDay(item.Key, 0));
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

        private readonly Dictionary<int, List<double>> _carSpeedsForEachHourOfDay = new()
        {
            { 0, new List<double> {}},
            { 1, new List<double> {}},
            { 2, new List<double> {}},
            { 3, new List<double> {}},
            { 4, new List<double> {}},
            { 5, new List<double> {}},
            { 6, new List<double> {}},
            { 7, new List<double> {}},
            { 8, new List<double> {}},
            { 9, new List<double> {}},
            { 10, new List<double> {}},
            { 11, new List<double> {}},
            { 12, new List<double> {}},
            { 13, new List<double> {}},
            { 14, new List<double> {}},
            { 15, new List<double> {}},
            { 16, new List<double> {}},
            { 17, new List<double> {}},
            { 18, new List<double> {}},
            { 19, new List<double> {}},
            { 20, new List<double> {}},
            { 21, new List<double> {}},
            { 22, new List<double> {}},
            { 23, new List<double> {}},
        };
    }
}
