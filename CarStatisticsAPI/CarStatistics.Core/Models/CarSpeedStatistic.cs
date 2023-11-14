namespace CarStatistics.Core.models
{
    public class CarSpeedStatistic : Entity
    {
        public DateTime CarSpeedDate { get; set; }
        public int CarSpeed { get; set; }
        public string CarRegistrationNumber { get; set;} = string.Empty;
    }
}
