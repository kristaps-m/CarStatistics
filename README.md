### Name Lastname

Kristaps Mītins

### How to run project

### :exclamation::exclamation::exclamation: Download and install :exclamation::exclamation::exclamation:

Microsoft SQL Server Management Studio <br>
https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16

SQL Server <br>
https://www.microsoft.com/en-us/sql-server/sql-server-downloads

Node Js Latest LTS Version<br>
https://nodejs.org/en/download/

Visual Studio<br/>
https://visualstudio.microsoft.com/free-developer-offers/

.NET 6.0 <br>
https://dotnet.microsoft.com/en-us/download

1. Download all files and folders inside 'CarStatistics'.

   - CarStatistics
     - car_statistics-nextjs-app
     - CarStatisticsAPI
     - README.md

2. Inside '/CarStatistics/CarStatisticsAPI' open the CarStatisticsAPI.sln file using 'Visual Studio'.

   - 2.1 Inside 'Visual Studio' open 'Package Manager Console' and set Default project to 'CarStatistics.Data'.
   - 2.2 Migrations is already set so type 'Update-Database'.
   - <img src="readme_pics/update_database.png">
   - 2.3 This will create database in sql server named 'CarStatistics' and table 'CarSpeedStatistics'.
   - You can open 'Microsoft SQL Server Management Studio' and take a look.
   - <img src="readme_pics/empty_table.png">

3. To add data in database. In 'Visual Studio' open 'CarStatisticsDataLoaderIntoSystem'.

   - 3.1 Set as start up project 'CarStatisticsDataLoaderIntoSystem'
   - <img src="readme_pics/start_console_app.png">
   - 3.2 By default it will use 'speed.txt' `string THE_FILE_NAME = "speed.txt";`
     - For testing you can use 'data_test.txt'
       - If you want to delete test files from database you can use query `DELETE FROM [CarStatistics].[dbo].[CarSpeedStatistics]` (or similar depending on your naming)
       - If you also want to reset tables ID's use `TRUNCATE TABLE [CarStatistics].[dbo].[CarSpeedStatistics]`
   - 3.3 Set `addDataToSQLDatabase` to `true`! (`bool addDataToSQLDatabase = true;`)
   - 3.4 Launch the 'CarStatisticsDataLoaderIntoSystem' console application.
     - At the end it should print 'End connection'.
     - You can look inside 'Microsoft SQL Server Management Studio'
     - <img src="readme_pics/data_added_to_sql.png">

4. Launch ASP.NET web API and NextJS project.

   - 4.1 Launch using cmd or powershell.

     - 4.1.1 Go to CarStatistics/CarStatisticsAPI/CarStatisticsAPI directory
     - 4.1.2 Open CMD (Command prompt) or powershell there and type 'dotnet run'

     OR

   - 4.2 Launch using 'Visual Studio'
     - 4.2.1 Set as start-up project 'CarStatisticsAPI' and launch project.
   - 4.3 Launch NextJS application.
     - 4.3.1 Go to 'CarStatistics/car_statistics-nextjs-app' open 'cmd' or powershell.
     - 4.3.2 Type 'npm run dev'

5. Go to Web Browser.

   - Go to https://localhost:5000/swagger/index.html for 'Swagger UI'
   - Go to http://localhost:3000 for NextJS frontend. This is simple homepage.
   - Go to http://localhost:3000/car-statistics for 'CarStatistics' table.
     - Click on 'View' to go to 'CarStatisticDetails'
     - Go to http://localhost:3000/car-statistics/100 for 'CarStatisticDetails'.
   - Go to http://localhost:3000/car-graph for 'CarStatistics' avg speed graph.

6. Use functionality.
   - car-statistics
     - Inside http://localhost:3000/car-statistics.
     - If no filters are entered it returns the first 1000 'CarStatistics'.
     - Enter 'Date from' or 'Date to' or 'Speed' or None to filter 'CarStatistics'.
       - Remember we inserted 'CarStatistics' with dates from 01-08-2020 to 31-08-2020.
     - If you enter 'Date from' = '01-08-2020' it will returns over 200'000.
   - car-graph
     - Inside http://localhost:3000/car-graph.
     - Enter 'Date' to see average speed that day by hours.
       - Remember we inserted 'CarStatistics' with dates from 01-08-2020 to 31-08-2020.

### Problems

- A large amount of data. I have never worked before with a database that has over 200'000 rows. The challenge was to insert all rows in the SQL database quickly.
- The challenge was to display data in the frontend. At the beginning I inserted test data (100) rows, and added simple pagination. It worked until I inserted all 200'000+ rows. Simple pagination did not work because it displayed pagination numbers from 1 to data 'row count / page size' (220'000 / 20). After searching the internet and adding modifications to my Pagination I fixed this issue. Now it is a beautiful pagination with few buttons.
- The Challenge to display a graph and inform users about when data is loaded correctly. When a date is entered frontend displays a graph with calculations at different times. That could be confusing to a user. For now, I added 3.5 second delay to the `dateChanged` constant to indicate loading longer.

### Improvements

- Make app mobile frendly.
- Modify app so that it returns page by page.

  - Change http://localhost:3000/car-statistics to something like http://localhost:3000/car-statistics?page=5
    Modify backend link from https://localhost:5000/api/carspeedstatistic/get-filtered?speed=100&dateFrom=2020-08-20&dateUntil=2020-08-21 to someghing like https://localhost:5000/api/carspeedstatistic/get-filtered?speed=100&dateFrom=2020-08-20&dateUntil=2020-08-21&page=1

  - Modify return type from:

  ```
    [CarStatistics[]]
  ```

  to something like:

  ```
    {
      info: {returnSize: 1000, pagesCount: 50}
      results:CarStatistics[]
    }
  ```

- When returning calculated average speed results include the date. For, example:

  - Change return type from `[{'hour':0, 'speed': 55,33}]` to `{'searchDate': '2020-08-14', 'result': [{'hour':0, 'speed': 55.33}]}`

- Inside http://localhost:3000/car-graph let user pick graph type. Now it is very close up graph.

### Pictures from project

https://localhost:5000/swagger/index.html
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/swagger_ui.png">

http://localhost:3000
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/home_page.png">

http://localhost:3000/car-statistics
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/car_speed_statistics.png">

http://localhost:3000/car-statistics with filter<br/>
backend search: get-filtered?speed=70&dateFrom=2020-08-11&dateUntil=2020-08-19
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/car_speed_statistics_with_filter.png">

http://localhost:3000/car-graph
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/car_graph.png">

http://localhost:3000/car-statistics/{id}
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/car_speed_st_details.png">

CarStatistics/car_statistics-nextjs-app -> powershell -> 'npm run test'
<img src="../CarStatistics/car_statistics-nextjs-app/readme_pictures/tests.png">
