namespace CarStatistics.Core.Models
{
    public class CarAverageSpeedResultsInDay
    {
        public DateTime DateAvgSpeedIsSearched { get; set; }
        public List<SpeedResultEachHour> ResultEachHour { get; set; }
    }

    public class SpeedResultEachHour
    {
        public int Hour { get; set; }
        public double Speed { get; set; }
        public SpeedResultEachHour(int hour, double speed)
        {
            this.Hour = hour;
            this.Speed = speed;
        }
    }
}
