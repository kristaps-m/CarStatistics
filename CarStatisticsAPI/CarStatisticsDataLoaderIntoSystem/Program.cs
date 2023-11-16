using CarStatistics.Core.models;
using Newtonsoft.Json;
using System.Text;

string MAIN_PATH = Directory.GetCurrentDirectory().Replace("bin\\Debug\\net6.0", "");

List<CarSpeedStatistic> carSpeedDataList = GetYourData(MAIN_PATH);
int dataAddedCount = 0;
//var listOfLineCountsInFile = new int[] {50000, 100000,150000,200000 };
var listOfLineCountsInFile = new int[] { 15, 30, 60, 80 };

bool loadAllDataFromTextFile = false;

if (loadAllDataFromTextFile)
{
    foreach (var carSpeedData in carSpeedDataList)
    {
        await AddCarSpeedDataAsync(carSpeedData); // uncomment this to add data to SQL DB
        dataAddedCount++;
        if (listOfLineCountsInFile.Contains(dataAddedCount))
        {
            Console.WriteLine($"Added  - {dataAddedCount} - records to SQL data base!");
        }
    }
    Console.WriteLine("It is all done!");
}
else
{
    Console.WriteLine($"DATA IS NOT LOADED FOR SAFETY REASONS! Variable loadAllDataFromTextFile is {loadAllDataFromTextFile}");
}



static async Task AddCarSpeedDataAsync(CarSpeedStatistic carSpeedData)
{
    string apiUrl = "https://localhost:5000/api/CarSpeedStatistic/add";

    using (HttpClient client = new HttpClient())
    {
        // Convert object to JSON
        string jsonData = JsonConvert.SerializeObject(carSpeedData);

        // Create HttpContent with JSON data
        StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        // Send the POST request
        HttpResponseMessage response = await client.PostAsync(apiUrl, content);

        // Check if the request was successful
        if (response.IsSuccessStatusCode)
        {
            //Console.WriteLine($"Data added successfully for Car Registration Number: {carSpeedData.CarRegistrationNumber}");
        }
        else
        {
            Console.WriteLine($"Failed to add data for Car Registration Number: {carSpeedData.CarRegistrationNumber}. StatusCode: {response.StatusCode}");
        }
    }
}

static List<CarSpeedStatistic> GetYourData(string main_path)
{
    string carStatisticsFileName = "data_test.txt";
    string carStatisticFilePath = Path.Combine(main_path, carStatisticsFileName);

    Console.WriteLine("Hello, World!");
    var lines = File.ReadAllLines(carStatisticFilePath);
    var theBigCarSpeedStatisticList = new List<CarSpeedStatistic>();

    for (var i = 0; i < lines.Length; i += 1)
    {
        var oneLineFromFile = lines[i];
        var listOfStrings = oneLineFromFile.Split("\t");
        var  carSpeedStatisct = new CarSpeedStatistic();
        carSpeedStatisct.CarSpeedDate = DateTime.Parse(listOfStrings[0]);
        carSpeedStatisct.CarSpeed = Convert.ToInt32(listOfStrings[1]);
        carSpeedStatisct.CarRegistrationNumber = listOfStrings[2];

        theBigCarSpeedStatisticList.Add(carSpeedStatisct);
    }

    return theBigCarSpeedStatisticList;
}
