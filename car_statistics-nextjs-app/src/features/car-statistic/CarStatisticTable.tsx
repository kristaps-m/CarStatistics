import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { CarStatistic } from "../../app/models/CarStatistic";
import CarStatisticRow from "./CarStatisticRow";
import Pagination, { paginate } from "../../component/Pagination";
import { useDebounce } from "use-debounce";

function ToDate(dateString: string) {
  return new Date(dateString);
}

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [carStatistics, setCarStatistics] = useState<CarStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  // DEBOUNCE Car Reg Nr
  const [text, setText] = useState("");
  const [searchRegNr] = useDebounce(text, 2000); // 2 seconds
  const handleCarRegNrReset = () => {
    setText("");
  };
  // DEBOUNCE Car speed
  const [carNr, setCarNr] = useState(0);
  const [searchByCarSpeed] = useDebounce(carNr, 2000); // 2 seconds
  const handleSpeedSearchReset = () => {
    setCarNr(0);
  };
  // DEBOUNCE Date from
  const [carDateFrom, setCarDateFrom] = useState("");
  const [searchCarDateFrom] = useDebounce(carDateFrom, 2000); // 2 seconds
  const handleDateFromReset = () => {
    setCarDateFrom("");
  };
  // DEBOUNCE Date to
  const [carDateTo, setCarDateTo] = useState("");
  const [searchCarDateTo] = useDebounce(carDateTo, 2000); // 2 seconds
  const handleDateToReset = () => {
    setCarDateTo("");
  };

  useEffect(() => {
    agent.Catalog.list()
      .then((carStatistics) => {
        let filteredCarStatistics;
        console.log(
          searchCarDateFrom == "",
          isNaN(Date.parse(searchCarDateFrom)),
          searchCarDateTo == "",
          isNaN(Date.parse(searchCarDateTo))
        );
        // IF both dates empty search for car number and speed
        if (searchCarDateFrom == "" && searchCarDateTo == "") {
          filteredCarStatistics = carStatistics.filter(
            (oneCarStatistic: CarStatistic) =>
              oneCarStatistic.carRegistrationNumber
                .toLowerCase()
                .includes(searchRegNr.toLowerCase()) &&
              oneCarStatistic.carSpeed >= searchByCarSpeed
          );
        } else if (searchCarDateFrom != "" && searchCarDateTo != "") {
          filteredCarStatistics = carStatistics.filter(
            (oneCarStatistic: CarStatistic) =>
              oneCarStatistic.carRegistrationNumber
                .toLowerCase()
                .includes(searchRegNr.toLowerCase()) &&
              oneCarStatistic.carSpeed >= searchByCarSpeed &&
              Date.parse(oneCarStatistic.carSpeedDate) >
                Date.parse(searchCarDateFrom) &&
              Date.parse(oneCarStatistic.carSpeedDate) <=
                Date.parse(searchCarDateTo)
          );
        } else if (searchCarDateFrom != "") {
          filteredCarStatistics = carStatistics.filter(
            (oneCarStatistic: CarStatistic) =>
              oneCarStatistic.carRegistrationNumber
                .toLowerCase()
                .includes(searchRegNr.toLowerCase()) &&
              oneCarStatistic.carSpeed >= searchByCarSpeed &&
              Date.parse(oneCarStatistic.carSpeedDate) >
                Date.parse(searchCarDateFrom)
          );
        } else if (searchCarDateTo != "") {
          filteredCarStatistics = carStatistics.filter(
            (oneCarStatistic: CarStatistic) =>
              oneCarStatistic.carRegistrationNumber
                .toLowerCase()
                .includes(searchRegNr.toLowerCase()) &&
              oneCarStatistic.carSpeed >= searchByCarSpeed &&
              Date.parse(oneCarStatistic.carSpeedDate) <=
                Date.parse(searchCarDateTo)
          );
        }

        setCarStatistics(filteredCarStatistics);
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
    `Speed = ${searchByCarSpeed}, From = ${searchCarDateFrom}, To = ${searchCarDateTo}, Len = ${
      carStatistics.length
    }\n From.P = ${Date.parse(searchCarDateFrom)}, To.P = ${Date.parse(
      searchCarDateTo
    )},\n From.ToDate = ${ToDate(searchCarDateFrom)}, To.ToDate = ${ToDate(
      searchCarDateTo
    )}`
  );
  // 2020-08-01 00:07:55
  console.log(
    ToDate("2020-08-01T00:07:55"),
    Date.parse("2020-08-01T00:07:55"),
    "2020-08-01 00:07:55"
  );
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
          onClick={handleDateToReset}
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
          onClick={handleDateFromReset}
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
          onClick={handleSpeedSearchReset}
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
          placeholder="Search car Nr..."
          onChange={(e) => {
            setText(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleCarRegNrReset}
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
      <Pagination
        items={carStatistics.length}
        currentPage={currentPage} // 1
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
