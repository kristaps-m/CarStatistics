using CarStatistics.Core.Interfaces;
using CarStatistics.Core.models;
using Microsoft.AspNetCore.Mvc;

namespace CarStatisticsAPI.Controllers
{
    [Route("api/[controller]")]
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
            var carSpeedStatisticToUpdate = _carSpeedStatisticService.GetById(id);
            carSpeedStatisticToUpdate.CarSpeedDate = newCarSpeedStatistic.CarSpeedDate;
            carSpeedStatisticToUpdate.CarSpeed = newCarSpeedStatistic.CarSpeed;
            carSpeedStatisticToUpdate.CarRegistrationNumber = newCarSpeedStatistic.CarRegistrationNumber;

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

        [Route("get-bydate")]
        [HttpGet]
        public IActionResult GetAllCarSpeedStatisticByDate(DateTime searchByDate)
        {
            var allCarSpeedStatistic = _carSpeedStatisticService.GetTheThings(searchByDate);

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
