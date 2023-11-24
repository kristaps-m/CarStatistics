import React, { useState, useEffect } from "react";
import { VictoryChart } from "victory-chart/lib/victory-chart";
import agent from "../../app/api/agent";
import {
  VictoryAxis,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { useDebounce } from "use-debounce";

interface SpeedResultEachHour {
  hour: number;
  speed: number;
}

interface CarAverageSpeedResultsInDay {
  dateAvgSpeedIsSearched: string;
  resultEachHour: SpeedResultEachHour[];
}

export default function Graph() {
  const [carStatisticsAvgSpeed, setCarAvgSpeedResultsInDay] = useState<
    SpeedResultEachHour[]
  >([]);
  const [dateUserIsSearchedFromAPI, setSearchedDateFromAPI] = useState("");
  const [loading, setLoading] = useState(true);
  const [carDateForGraph, setCarDateToGetAvgSpeed] = useState("");
  const [dateChanged, setDateChanged] = useState(false);
  const [searchDebounceCarDateForGraph] = useDebounce(carDateForGraph, 400); // 400 ms
  const handleDateSearchReset = () => {
    setCarDateToGetAvgSpeed("");
    setCarAvgSpeedResultsInDay([]);
    setSearchedDateFromAPI("");
  };

  useEffect(() => {
    agent.Catalog.getAvgSpeedEachHourByDate(searchDebounceCarDateForGraph)
      .then((data: CarAverageSpeedResultsInDay) => {
        setCarAvgSpeedResultsInDay(data.resultEachHour);
        setSearchedDateFromAPI(data.dateAvgSpeedIsSearched.split("T")[0]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // show 'Calculating average speed.' longer after changing date!
    const interval = setInterval(() => setDateChanged(false), 1000);

    return () => clearInterval(interval);
  }, [searchDebounceCarDateForGraph]);

  console.log(carStatisticsAvgSpeed);

  return (
    <div data-testid="homePage-1">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        Average car speed by hour.
      </h1>
      <h3 className="flex justify-center text-3xl font-bold mb-4">
        Enter date below and wait for calculation.
      </h3>
      <div className="flex justify-center">
        <input
          type="date"
          value={carDateForGraph}
          placeholder="Search date from..."
          onChange={(e) => {
            setCarDateToGetAvgSpeed(e.target.value);
            setDateChanged(true);
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleDateSearchReset}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Date
        </button>
      </div>
      <br />
      <br />
      {searchDebounceCarDateForGraph == ""
        ? renderH1GraphText("No date provided. Graph is empty!")
        : ""}
      {carStatisticsAvgSpeed.length == 0 && searchDebounceCarDateForGraph != ""
        ? renderH1GraphText(
            `Calculating average speed. Calculating... ${searchDebounceCarDateForGraph}`
          )
        : ""}
      {carStatisticsAvgSpeed.length > 0 &&
      searchDebounceCarDateForGraph != dateUserIsSearchedFromAPI
        ? renderH1GraphText(
            `Calculating average speed. Calculating... ${searchDebounceCarDateForGraph}`
          )
        : ""}
      {carStatisticsAvgSpeed.length > 0 &&
      searchDebounceCarDateForGraph == dateUserIsSearchedFromAPI
        ? renderH1GraphText(
            `Enjoy you Graph. Date: ${dateUserIsSearchedFromAPI}`
          )
        : ""}
      {/* Display Graph */}
      {loading ? (
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          Graph is loading!
        </h1>
      ) : (
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: "white" }}
                />
              }
            />
          }
        >
          <VictoryLine
            data={carStatisticsAvgSpeed}
            x="hour"
            y="speed"
            labels={({ datum }: { datum: SpeedResultEachHour }) =>
              `time: ${datum.hour}:00\nspeed: ${datum.speed}`
            } // Tooltip content for data points
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
          <VictoryAxis label={`\n\n\nHour`} tickFormat={(t) => `${t}:00`} />
          <VictoryAxis dependentAxis label="Speed" />
        </VictoryChart>
      )}
    </div>
  );
}

function renderH1GraphText(params: string) {
  return (
    <h1 className="flex justify-center text-3xl font-bold mb-4">{params}</h1>
  );
}
