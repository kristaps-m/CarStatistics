import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { CarStatistic } from "../../app/models/CarStatistic";
import CarStatisticRow from "./CarStatisticRow";
import AppPagination, { paginate } from "../../component/AppPagination";
import { useDebounce } from "use-debounce";

function ToDate(dateString: string) {
  return new Date(dateString);
}

const searchDelayinMS = 2500;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [carStatistics, setCarStatistics] = useState<CarStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  // DEBOUNCE Car speed
  const [carSpeed, setCarSpeed] = useState("");
  const [searchByCarSpeed] = useDebounce(carSpeed, searchDelayinMS);
  const handleSpeedSearchReset = () => {
    setCarSpeed("");
  };
  // DEBOUNCE Date from
  const [carDateFrom, setCarDateFrom] = useState("");
  const [searchCarDateFrom] = useDebounce(carDateFrom, searchDelayinMS);
  const handleDateFromReset = () => {
    setCarDateFrom("");
  };
  // DEBOUNCE Date to
  const [carDateUntill, setCarDateTo] = useState("");
  const [searchCarDateUntil] = useDebounce(carDateUntill, searchDelayinMS);
  const handleDateToReset = () => {
    setCarDateTo("");
  };

  useEffect(() => {
    agent.Catalog.getObjectsBySpeedDatefromDateuntill(
      searchByCarSpeed,
      searchCarDateFrom,
      searchCarDateUntil
    )
      .then((data) => {
        setCarStatistics(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchByCarSpeed, searchCarDateFrom, searchCarDateUntil]);

  const paginatedPosts: CarStatistic[] = paginate(
    carStatistics,
    currentPage,
    pageSize
  );
  console.log(
    `Speed = ${searchByCarSpeed}, From = ${searchCarDateFrom}, To = ${searchCarDateUntil}, Len = ${
      carStatistics.length
    }\n From.P = ${Date.parse(searchCarDateFrom)}, To.P = ${Date.parse(
      searchCarDateUntil
    )},\n From.ToDate = ${ToDate(searchCarDateFrom)}, To.ToDate = ${ToDate(
      searchCarDateUntil
    )}
    \n${carSpeed}
    `
  );

  return (
    <div data-testid="productList-1">
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
          onClick={handleDateFromReset}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Date from
        </button>
      </div>
      {/* DATE to ---------------------------------------------------------------------------- */}
      <div className="flex justify-center">
        <input
          type="date"
          value={carDateUntill}
          placeholder="Search date to..."
          onChange={(e) => {
            setCarDateTo(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleDateToReset}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Date to
        </button>
      </div>

      {/* SPEED -------------------------------------------------------------------------------- */}
      <div className="flex justify-center">
        <input
          type="text"
          value={carSpeed}
          placeholder="Speed > or equal to.."
          onChange={(e) => {
            setCarSpeed(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleSpeedSearchReset}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset Speed
        </button>
      </div>
      <AppPagination
        items={carStatistics.length}
        currentPage={currentPage} // 1
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Row Nr</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">
                  CarSpeedDate <p style={{ fontSize: 10 }}>(dd/mm/yyyy)</p>
                </th>
                <th className="px-4 py-2">CarSpeed</th>
                <th className="px-4 py-2">CarRegistrationNumber</th>
                <th className="px-4 py-2">View</th>
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
      <AppPagination
        items={carStatistics.length}
        currentPage={currentPage} // 1
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
