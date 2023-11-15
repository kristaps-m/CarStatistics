// ProductList.tsx
import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { CarStatistic } from "../../app/models/CarStatistic";
import CarStatisticRow from "./CarStatisticRow";
import Pagination, { paginate } from "../../component/Pagination";
import { useDebounce } from "use-debounce";

function ConvertTheCarDate(theDate: string) {
  const carSpeedDate = new Date(theDate);
  const formattedCarSpeedDate = carSpeedDate.toISOString().split("T")[0];

  return formattedCarSpeedDate;
}

function ToDate(dateString: string) {
  return new Date(dateString);
}

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [carStatistics, setProducts] = useState<CarStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  // DEBOUNCE Car Reg Nr
  const [text, setText] = useState("");
  const [searchRegNr] = useDebounce(text, 2000); // 2 seconds
  const handleReset = () => {
    setText("");
  };
  // DEBOUNCE Car speed
  const [carNr, setCarNr] = useState(0);
  const [searchByCarSpeed] = useDebounce(carNr, 2000); // 2 seconds
  const handleReset2 = () => {
    setCarNr(0);
  };
  // DEBOUNCE Date from
  const [carDateFrom, setCarDateFrom] = useState("");
  const [searchCarDateFrom] = useDebounce(carDateFrom, 2000); // 2 seconds
  const handleReset3 = () => {
    setCarDateFrom("");
  };
  // DEBOUNCE Date to
  const [carDateTo, setCarDateTo] = useState("");
  const [searchCarDateTo] = useDebounce(carDateTo, 2000); // 2 seconds
  const handleReset4 = () => {
    setCarDateTo("");
  };

  useEffect(() => {
    agent.Catalog.list()
      .then((carStatistics) => {
        const filteredCarStatistics = carStatistics.filter(
          (oneCarStatistic: CarStatistic) =>
            oneCarStatistic.carRegistrationNumber
              .toLowerCase()
              .includes(searchRegNr.toLowerCase()) &&
            oneCarStatistic.carSpeed >= searchByCarSpeed &&
            ToDate(oneCarStatistic.carSpeedDate) > ToDate(searchCarDateFrom) &&
            ToDate(oneCarStatistic.carSpeedDate) <= ToDate(searchCarDateTo)
        );

        setProducts(filteredCarStatistics);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchByCarSpeed, searchRegNr, searchCarDateFrom, searchCarDateTo]);

  const paginatedPosts: CarStatistic[] = paginate(
    carStatistics,
    currentPage,
    pageSize
  );
  console.log(
    `Speed = ${searchByCarSpeed}, From = ${searchCarDateFrom}, To = ${searchCarDateTo}, Len = ${carStatistics.length}`
  );
  // 2020-08-01 00:07:55
  console.log(ToDate("2020-08-01T00:07:55"), "2020-08-01 00:07:55");
  return (
    <div data-testid="productList-1">
      {/* DATE to ---------------------------------------------------------------------------- */}
      <div className="flex justify-center">
        <input
          type="date"
          value={carDateTo}
          placeholder="Search date to..."
          onChange={(e) => {
            setCarDateTo(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleReset4}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Date to
        </button>
      </div>
      {/* DATE from ---------------------------------------------------------------------------- */}
      <div className="flex justify-center">
        <input
          type="date"
          value={carDateFrom}
          placeholder="Search date from..."
          onChange={(e) => {
            setCarDateFrom(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
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
      {/* SPEED -------------------------------------------------------------------------------- */}
      <div className="flex justify-center">
        <input
          type="number"
          value={carNr}
          placeholder="Speed > or equal to.."
          onChange={(e) => {
            setCarNr(parseInt(e.target.value));
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleReset2}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Speed
        </button>
      </div>
      {/* -------------------------------------------------------------------------------- */}
      <div className="flex justify-center">
        <input
          type="text"
          value={text}
          placeholder="Search products..."
          onChange={(e) => {
            setText(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleReset}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Car Nr
        </button>
      </div>
      {/* -------------------------------------------------------------------------------- */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Row Nr</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">CarSpeedDate</th>
                <th className="px-4 py-2">CarSpeed</th>
                <th className="px-4 py-2">CarRegistrationNumber</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((oneCarStatistic, index) => (
                <CarStatisticRow
                  index={index + 1}
                  key={oneCarStatistic.id}
                  carStatistic={oneCarStatistic}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />
      <Pagination
        items={carStatistics.length}
        currentPage={currentPage} // 1
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
