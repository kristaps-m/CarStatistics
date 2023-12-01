import React, { useState, useEffect } from "react";
import { VictoryChart } from "victory-chart/lib/victory-chart";
import Agent from "../../app/api/Agent";
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
    Agent.Catalog.getAvgSpeedEachHourByDate(searchDebounceCarDateForGraph)
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
      {carStatisticsAvgSpeed.length > 0 &&
      searchDebounceCarDateForGraph != dateUserIsSearchedFromAPI
        ? renderH1GraphText(
            `Calculating average speed. Calculating... ${searchDebounceCarDateForGraph}`
          )
        : ""}
      {carStatisticsAvgSpeed.length > 0 &&
      searchDebounceCarDateForGraph == dateUserIsSearchedFromAPI &&
      !isAvgSpeedZero(carStatisticsAvgSpeed)
        ? renderH1GraphText(
            `Enjoy you Graph. Date: ${dateUserIsSearchedFromAPI}`
          )
        : ""}
      {carStatisticsAvgSpeed.length != 0 &&
      searchDebounceCarDateForGraph == dateUserIsSearchedFromAPI &&
      isAvgSpeedZero(carStatisticsAvgSpeed) ? (
        <>
          {renderH1GraphText(`Date you entered (${dateUserIsSearchedFromAPI})
          have avg speed 0. Feel free to pick another date.`)}
          <p className="flex justify-center">
            This might be because this date has no records about speeds.
          </p>
        </>
      ) : (
        ""
      )}
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

function isAvgSpeedZero(params: SpeedResultEachHour[]) {
  let totalSpeed = 0.0;
  params.forEach((element) => {
    totalSpeed += element.speed;
  });
  console.log(totalSpeed, "This is total speed");
  return totalSpeed == 0.0;
}
