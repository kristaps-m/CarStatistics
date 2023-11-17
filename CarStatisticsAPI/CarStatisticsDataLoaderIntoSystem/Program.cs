﻿using CarStatistics.Core.models;
using Microsoft.Data.SqlClient;
using System.Data;

string MAIN_PATH = Directory.GetCurrentDirectory().Replace("bin\\Debug\\net6.0", "");
string THE_FILE_NAME = "speed.txt";

List<CarSpeedStatistic> carSpeedDataList = GetYourData(MAIN_PATH, THE_FILE_NAME);
var dataListLength = carSpeedDataList.Count;

Console.WriteLine("Hello World!");
// This is connection string from \CarStatistics\CarStatisticsAPI\CarStatisticsAPI\appsettings.json
string connectionString = "Data Source=.;Initial Catalog=CarStatistics;Integrated Security=True;";
using var connection = new SqlConnection(connectionString);

var theTable = new DataTable();
theTable.Columns.Add("Id");
theTable.Columns.Add("CarSpeedDate");
theTable.Columns.Add("CarSpeed");
theTable.Columns.Add("CarRegistrationNumber");

for (int i = 0; i < dataListLength; i++)
{
    var cDate = carSpeedDataList[i].CarSpeedDate;
    var cSpeed = carSpeedDataList[i].CarSpeed;
    var cRegNr = carSpeedDataList[i].CarRegistrationNumber;
    theTable.Rows.Add(new object[] {i+1, cDate, cSpeed, cRegNr});
}

using var bulkCopy = new SqlBulkCopy(connection);
bulkCopy.DestinationTableName = "CarSpeedStatistics";
bulkCopy.BatchSize = dataListLength;
bulkCopy.BulkCopyTimeout = 40 * 60;
connection.Open();
await bulkCopy.WriteToServerAsync(theTable);

Console.WriteLine("End connection");

static List<CarSpeedStatistic> GetYourData(string mainPath, string theFileName)
{
    string carStatisticsFileName = theFileName;
    string carStatisticFilePath = Path.Combine(mainPath, carStatisticsFileName);

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
