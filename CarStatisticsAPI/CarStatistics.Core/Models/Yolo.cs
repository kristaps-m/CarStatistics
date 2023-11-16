namespace CarStatistics.Core.Models
{
    public class Yolo
    {
        public int hour { get; set; }
        public int speed { get; set; }
        public Yolo(int hour, int speed)
        {
            this.hour = hour;
            this.speed = speed;
        }
    }
}
