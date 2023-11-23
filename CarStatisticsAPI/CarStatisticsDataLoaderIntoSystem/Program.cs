using CarStatistics.Core.models;
using Microsoft.Data.Sqlite;
using System.Data;

string MAIN_PATH = Directory.GetCurrentDirectory().Replace("bin\\Debug\\net6.0", "");
string THE_FILE_NAME = "speed.txt";
string myLocalPath = MAIN_PATH.Replace("CarStatisticsDataLoaderIntoSystem", "CarStatisticsAPI");
// This is connection string from \CarStatistics\CarStatisticsAPI\CarStatisticsAPI\appsettings.json
string FULL_CONNECTION_STRING = $"Data Source={myLocalPath}CarStatisticsSQLite.db";
bool addDataToSQLDatabase = false;

string connectionString = FULL_CONNECTION_STRING;

if (addDataToSQLDatabase)
{
    AddDataToSQLDatabase();
    Console.WriteLine("End connection");
}
else
{
    Console.WriteLine($"AddData variable is '{addDataToSQLDatabase}' for safety reasons. Set it to 'true' to add data!");
}


void AddDataToSQLDatabase()
{

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        DataTable dataTable = CreateDataTable(MAIN_PATH, THE_FILE_NAME);

        // Bulk insert using SqliteCommand and SqliteTransaction
        using (var transaction = connection.BeginTransaction())
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
                INSERT INTO CarSpeedStatistics
                (Id, CarSpeedDate, CarSpeed, CarRegistrationNumber)
                VALUES
                (@Id, @CarSpeedDate, @CarSpeed, @CarRegistrationNumber)";

                foreach (DataRow row in dataTable.Rows)
                {
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@Id", row["Id"]);
                    DateTime carSpeedDate = DateTime.Parse(row["CarSpeedDate"].ToString());
                    string formattedDate = carSpeedDate.ToString("yyyy-MM-dd HH:mm:ss");
                    command.Parameters.AddWithValue("@CarSpeedDate", formattedDate);
                    command.Parameters.AddWithValue("@CarSpeed", row["CarSpeed"]);
                    command.Parameters.AddWithValue("@CarRegistrationNumber", row["CarRegistrationNumber"]);
                    command.ExecuteNonQuery();
                }
            }
            Console.WriteLine("Done?");
            transaction.Commit();
        }
    }
}

static DataTable CreateDataTable(string mainPath, string theFileName)
{
    List<CarSpeedStatistic> carSpeedDataList = GetYourData(mainPath, theFileName);
    var dataListLength = carSpeedDataList.Count;
    var theTable = new DataTable();
    theTable.Columns.Add("Id");
    theTable.Columns.Add("CarSpeedDate");
    theTable.Columns.Add("CarSpeed");
    theTable.Columns.Add("CarRegistrationNumber");

    Console.WriteLine("Creating DataTable!");

    for (int i = 0; i < dataListLength; i++)
    {
        var cDate = carSpeedDataList[i].CarSpeedDate;
        var cSpeed = carSpeedDataList[i].CarSpeed;
        var cRegNr = carSpeedDataList[i].CarRegistrationNumber;
        theTable.Rows.Add(new object[] { i + 1, cDate, cSpeed, cRegNr });
    }

    return theTable;
}

static List<CarSpeedStatistic> GetYourData(string mainPath, string theFileName)
{
    string carStatisticsFileName = theFileName;
    string carStatisticFilePath = Path.Combine(mainPath, carStatisticsFileName);

    Console.WriteLine("Starting to create CarSpeedStatistic list!");
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

    Console.WriteLine("List created!");
    return theBigCarSpeedStatisticList;
}
