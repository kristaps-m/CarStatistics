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

interface CarAverageSpeedResultsInDay {
  hour: number;
  speed: number;
}

export default function Graph() {
  const [carStatisticsAvgSpeed, setCarAvgSpeedResultsInDay] = useState<
    CarAverageSpeedResultsInDay[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [carDateFrom, setCarDateToGetAvgSpeed] = useState("");
  const [dateChanged, setDateChanged] = useState(false);
  const [searchCarDateFrom] = useDebounce(carDateFrom, 400); // 400 ms
  const handleDateSearchReset = () => {
    setCarDateToGetAvgSpeed("");
    setCarAvgSpeedResultsInDay([]);
  };

  useEffect(() => {
    agent.Catalog.getByDate(searchCarDateFrom)
      .then((data) => {
        setCarAvgSpeedResultsInDay(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // show 'Calculating average speed.' longer after changing date!
    const interval = setInterval(() => setDateChanged(false), 3500);

    return () => clearInterval(interval);
  }, [searchCarDateFrom]);

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
          value={carDateFrom}
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
      {searchCarDateFrom == ""
        ? renderH1GraphText("No date provided. Graph is empty!")
        : ""}
      {dateChanged ||
      (carStatisticsAvgSpeed.length == 0 && searchCarDateFrom != "")
        ? renderH1GraphText(
            `Calculating average speed. Calculating... ${searchCarDateFrom}`
          )
        : ""}
      {carStatisticsAvgSpeed.length > 0 &&
      searchCarDateFrom != "" &&
      !dateChanged
        ? renderH1GraphText("Enjoy you Graph.")
        : ""}
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
            labels={({ datum }: { datum: CarAverageSpeedResultsInDay }) =>
              `time: ${datum.hour}:00\nspeed: ${datum.speed}`
            } // Tooltip content for data points
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
          <VictoryAxis label="Hours" tickFormat={(t) => `${t}:00`} />
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
