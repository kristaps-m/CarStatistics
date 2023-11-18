import React, { useState, useEffect } from "react";
import { VictoryChart } from "victory-chart/lib/victory-chart";
import { CarStatistic } from "../../app/models/CarStatistic";
import agent from "../../app/api/agent";
import { VictoryAxis, VictoryLine, VictoryTheme } from "victory";
import { useDebounce } from "use-debounce";

const data = [
  { hour: 0, speed: 69 },
  { hour: 1, speed: 88 },
  { hour: 2, speed: 79 },
  { hour: 3, speed: 82 },
  { hour: 4, speed: 80 },
  { hour: 5, speed: 82 },
  { hour: 6, speed: 81 },
  { hour: 7, speed: 63 },
  { hour: 8, speed: 94 },
  { hour: 9, speed: 69 },
  { hour: 10, speed: 64 },
  { hour: 11, speed: 56 },
  { hour: 12, speed: 50 },
  { hour: 13, speed: 63 },
  { hour: 14, speed: 87 },
  { hour: 15, speed: 52 },
  { hour: 16, speed: 83 },
  { hour: 17, speed: 74 },
  { hour: 18, speed: 86 },
  { hour: 19, speed: 85 },
  { hour: 20, speed: 98 },
  { hour: 21, speed: 95 },
  { hour: 22, speed: 62 },
  { hour: 23, speed: 57 },
];

const dataFloat = [
  { hour: 0, speed: 20.86 },
  { hour: 1, speed: 11.37 },
  { hour: 2, speed: 51.03 },
  { hour: 3, speed: 44.89 },
  { hour: 4, speed: 71.05 },
  { hour: 5, speed: 60.06 },
  { hour: 6, speed: 47.35 },
  { hour: 7, speed: 40.58 },
  { hour: 8, speed: 53.52 },
  { hour: 9, speed: 38.95 },
  { hour: 10, speed: 41.32 },
  { hour: 11, speed: 52.92 },
  { hour: 12, speed: 54.46 },
  { hour: 13, speed: 60.44 },
  { hour: 14, speed: 52.1 },
  { hour: 15, speed: 23.16 },
  { hour: 16, speed: 51.86 },
  { hour: 17, speed: 6.2 },
  { hour: 18, speed: 96.55 },
  { hour: 19, speed: 2.02 },
  { hour: 20, speed: 71.85 },
  { hour: 21, speed: 46.89 },
  { hour: 22, speed: 60.23 },
  { hour: 23, speed: 25.42 },
];

interface CarAverageSpeedResultsInDay {
  hour: number;
  speed: number;
}

export default function Graph() {
  const [carStatistics, setCarAvgSpeedResultsInDay] = useState<
    CarAverageSpeedResultsInDay[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [carDateFrom, setCarDateFrom] = useState("");
  const [searchCarDateFrom] = useDebounce(carDateFrom, 1000); // 1 seconds
  const handleReset3 = () => {
    setCarDateFrom("");
  };

  useEffect(() => {
    agent.Catalog.getByDate(searchCarDateFrom)
      .then((data) => {
        setCarAvgSpeedResultsInDay(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchCarDateFrom]);

  console.log(carStatistics, searchCarDateFrom, "------------carStatistics");
  return (
    <div data-testid="homePage-1">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        THIS IS GRAPH
      </h1>
      <p className="flex justify-center text-lg text-center mb-8">
        Explore our wide range of high-quality products.
      </p>
      <div className="flex justify-center">
        <input
          type="date"
          value={carDateFrom}
          placeholder="Search date from..."
          onChange={(e) => {
            setCarDateFrom(e.target.value);
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleReset3}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Date from
        </button>
      </div>
      <br />
      <br />
      {carStatistics.length == 0 && searchCarDateFrom != "" ? (
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          Calculating average speed
        </h1>
      ) : (
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          See graph below
        </h1>
      )}
      {loading ? (
        "Graph is loading"
      ) : (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            data={carStatistics} // carStatistics
            x="hour"
            y="speed"
          />
          <VictoryAxis
            label="Hours"
            tickFormat={(t) => `${t}:00`} // Customize the x-axis tick labels as needed
          />
          <VictoryAxis dependentAxis label="Speed" />
        </VictoryChart>
      )}
      <br />
      <br />
      <div className="product p-4 bg-white rounded-lg shadow-lg max-w-[80%]">
        <div className="product-details">
          <h3 className="text-xl font-semibold">
            Top Product of the previous month:
          </h3>
          <br />
          <h3 className="text-lg font-semibold text-blue-600">Onion</h3>
          <br />
          <p className="text-sm max-w-[50%]">
            An GRAPH also known as the bulb onion or common onion, is a
            vegetable that is the most widely cultivated species of the genus
            Allium.
          </p>
          <p className="text-sm max-w-[50%]">
            The shallot is a botanical variety of the onion which was classified
            as a separate species until 2011. Its close relatives include
            garlic, scallion, leek, and chive.
          </p>
          <p className="text-sm font-semibold text-green-600">Price: $8.99</p>
        </div>
      </div>
      <p className="flex justify-center p-5 px-10">
        DISCLAIMER: Images are just to represent possible picture size in a real
        application. Do not take what&apos;s displayed in pictures seriously.
      </p>
    </div>
  );
}
