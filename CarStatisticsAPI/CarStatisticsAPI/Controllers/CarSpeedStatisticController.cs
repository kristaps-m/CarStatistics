using CarStatistics.Core.Interfaces;
using CarStatistics.Core.models;
using Microsoft.AspNetCore.Mvc;

namespace CarStatisticsAPI.Controllers
{
    [Route("api/carspeedstatistic")]
    [ApiController]
    public class CarSpeedStatisticController : ControllerBase
    {
        private readonly ICarSpeedStatisticService _carSpeedStatisticService;

        public CarSpeedStatisticController(ICarSpeedStatisticService carSpeedStatisticService)
        {
            _carSpeedStatisticService = carSpeedStatisticService;
        }

        [Route("add")]
        [HttpPost]
        public IActionResult AddCarSpeedStatistic(CarSpeedStatistic carSpeedStatistic)
        {
            _carSpeedStatisticService.Create(carSpeedStatistic);

            return Ok(carSpeedStatistic);
        }

        [Route("{id}")]
        [HttpPut]
        public IActionResult UpdateCarSpeedStatistic(int id, CarSpeedStatistic newCarSpeedStatistic)
        {
            var carSpeedStatisticToUpdate = _carSpeedStatisticService.UpdateCarSpeedStatistic(newCarSpeedStatistic, id);
            
            if (carSpeedStatisticToUpdate == null)
            {
                return NotFound();
            }

            return Created("", carSpeedStatisticToUpdate);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteCarSpeedStatistic(int id)
        {
            var objectToDelete = _carSpeedStatisticService.GetById(id);
            _carSpeedStatisticService.Delete(objectToDelete);

            return Ok($"CarSpeedStatistic with id {id} was deleted!");
        }

        [Route("get-all")]
        [HttpGet]
        public IActionResult GetAllCarSpeedStatistic()
        {
            var allCarSpeedStatistic = _carSpeedStatisticService.GetAll();

            return Ok(allCarSpeedStatistic);
        }
        // https://localhost:5000/api/carspeedstatistic/get?speed=95&dateFrom=2020-08-20T15%3A00%3A00&dateUntil=2020-08-21T00%3A00%3A00
        // https://localhost:5000/api/carspeedstatistic/get?speed=100&dateFrom=2020-08-20&dateUntil=2020-08-21
        // https://localhost:5000/api/carspeedstatistic/get?speed=100&dateUntil=2020-08-20
        [Route("get")]
        [HttpGet]
        public IActionResult GetBySpeedDatefromDateto(int? speed, DateTime? dateFrom, DateTime? dateUntil)
        {
            var allCarSpeedStatistic = _carSpeedStatisticService
                .FilterBySpeedDatefromDateuntil(speed, dateFrom, dateUntil);

            return Ok(allCarSpeedStatistic);
        }

        [Route("get-avgspeed-bydate")]
        [HttpGet]
        public IActionResult GetAllCarSpeedStatisticByDate(DateTime searchByDate)
        {
            var allCarSpeedStatistic = _carSpeedStatisticService.CalculateAverageSpeedByHourInDay(searchByDate);

            return Ok(allCarSpeedStatistic);
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetOneCarSpeedStatistic(int id)
        {
            var carSpeedStatistic = _carSpeedStatisticService.GetById(id);

            if (carSpeedStatistic == null)
            {
                return NotFound();
            }

            return Ok(carSpeedStatistic);
        }
    }
}
