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
  { hour: 24, speed: 67 },
];

// const data = [
//   { hour: 0, speed: 70 },
//   { hour: 1, speed: 69 },
//   { hour: 2, speed: 69 },
//   // ... other data points ...
// ];
interface Yolo {
  hour: number;
  speed: number;
}

interface avg {
  hour: number;
  avgSpeeds: number[];
}

// class X {
//   hour: number;
//   speed: number;

//   constructor(hour: number, speed: number) {
//     this.hour = hour;
//     this.speed = speed;
//   }
// }
/* Example return
  we need
  [
    {hour: 1, avgSpeeds: [1,2,3,4]}
  ]
  NOT?
  {
    1: [13,22,444],
    2: [55,66,77],
  }

*/

// function generateList(theSize:number) {
//   let result:X[] = [];
//   for (let index = 0; index < theSize; index++) {
//     result.push = new X(index, 0);
//   }

//   return result;
// }

// function wowFunction(dataIn: CarStatistic[]): avg {
//   // let theList: number[] = [];
//   // let theGreatTest: avg = {hour: 1, avgSpeeds:[]};
//   let theGreatTest: any;
//   dataIn.forEach((element) => {
//     const hour = new Date(element.carSpeedDate).getHours();
//     theGreatTest.hour = hour;
//     theGreatTest.avgSpeeds.push(hour);
//     // theGreatTest[hour] = "1";
//   });

//   return theGreatTest;
// }

// function calculateAvg(dataIn: avg) {
//   let avgResults: X[] = []
//   dataIn.forEach((element) => {});
// }

export default function Graph() {
  const [carStatistics, setYolo] = useState<Yolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [carDateFrom, setCarDateFrom] = useState("");
  const [searchCarDateFrom] = useDebounce(carDateFrom, 2000); // 2 seconds
  const handleReset3 = () => {
    setCarDateFrom("");
  };

  // useEffect(() => {
  //   agent.Catalog.list()
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    agent.Catalog.getByDate(searchCarDateFrom)
      .then((data) => {
        setYolo(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchCarDateFrom]);

  // const theHoursList = wowFunction(carStatistics);
  console.log(carStatistics, searchCarDateFrom, "------------carStatistics");
  return (
    <div data-testid="homePage-1">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        THIS IS GRAPH
      </h1>
      <p className="flex justify-center text-lg text-center mb-8">
        Explore our wide range of high-quality products.
      </p>
      {/* <h1>
        {loading
          ? "Hello"
          : `${carStatistics[0].hour},
          ${carStatistics[0].speed}`}
      </h1> */}
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
      {/* <div>
        {loading
          ? "Loading"
          : theHoursList.map((oneNum) => <p key={oneNum}>{oneNum}</p>)}
      </div> */}
      <br />
      <br />
      {loading ? (
        "Graph is loading"
      ) : (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            data={carStatistics}
            x="hour" // Assuming your data has a property called "hour" for the x-axis
            y="speed" // Assuming your data has a property called "speed" for the y-axis
          />
          <VictoryAxis
            label="Hours"
            tickFormat={(t) => `${t}:00`} // Customize the x-axis tick labels as needed
          />
          <VictoryAxis dependentAxis label="Speed" />
        </VictoryChart>
      )}
      {/* <VictoryChart
        height={300}
        width={300}
        domain={[-1, 1]}
        style={{
          background: { fill: "pink" },
        }}
        // backgroundComponent={<Background y={20} height={100} />}
      /> */}
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
