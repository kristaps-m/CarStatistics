namespace CarStatistics.Core.Models
{
    public class CarAverageSpeedResultsInDay
    {
        public int Hour { get; set; }
        public double Speed { get; set; }
        public CarAverageSpeedResultsInDay(int hour, double speed)
        {
            this.Hour = hour;
            this.Speed = speed;
        }
    }
}
