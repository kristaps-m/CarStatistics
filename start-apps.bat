@echo off
cd car_statistics-nextjs-app
start cmd /k npm run dev
cd ..

cd CarStatisticsAPI/CarStatisticsAPI
start cmd /k dotnet watch run
cd ../..

start "" "http://localhost:3000"
