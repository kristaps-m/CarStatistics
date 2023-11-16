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
        // avg speed example [{ hour: 0, speed: 69 }]
        // i get get hours from date
        // I can get speed from item
        // can i get {1 : [1,2,3,5]}
        // { id: 1, carSpeedDate: '2020-08-01 00:04:35', carSpeed: 70, carRegistrationNumber: 'SP8224' },
        public List<Yolo> GetTheThings(DateTime searchData)
        {
            var result = new List<Yolo>();

            foreach (var item in _thisIsForStoring)
            {
                foreach (var oneCarStatistic in _context.CarSpeedStatistics)
                {
                    if (oneCarStatistic.CarSpeedDate.Date == searchData.Date &&
                        item.Key == oneCarStatistic.CarSpeedDate.Hour)
                    {
                        item.Value.Add(oneCarStatistic.CarSpeed);
                    }
                }
            }

            foreach (var item in _thisIsForStoring)
            {
                //var test = string.Join(",", item.Value);
                if(item.Value.Count != 0)
                {
                    var theAvgSpeed = item.Value.Sum() / item.Value.Count;
                    result.Add(new Yolo(item.Key, theAvgSpeed));
                }
                else
                {
                    result.Add(new Yolo(item.Key, 0));
                }
            }

            return result;
        }

        private Dictionary<int, List<int>> _thisIsForStoring = new Dictionary<int, List<int>>()
        {
            { 0, new List<int> {}},
            { 1, new List<int> {}},
            { 2, new List<int> {}},
            { 3, new List<int> {}},
            { 4, new List<int> {}},
            { 5, new List<int> {}},
            { 6, new List<int> {}},
            { 7, new List<int> {}},
            { 8, new List<int> {}},
            { 9, new List<int> {}},
            { 10, new List<int> {}},
            { 11, new List<int> {}},
            { 12, new List<int> {}},
            { 13, new List<int> {}},
            { 14, new List<int> {}},
            { 15, new List<int> {}},
            { 16, new List<int> {}},
            { 17, new List<int> {}},
            { 18, new List<int> {}},
            { 19, new List<int> {}},
            { 20, new List<int> {}},
            { 21, new List<int> {}},
            { 22, new List<int> {}},
            { 23, new List<int> {}},
        };
    }
}
