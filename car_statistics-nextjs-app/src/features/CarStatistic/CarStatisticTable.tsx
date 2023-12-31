import React, { useState, useEffect } from "react";
import Agent from "../../app/api/Agent";
import { CarStatistic } from "../../app/Models/CarStatistic";
import CarStatisticRow from "./CarStatisticRow";
import AppPagination, { paginate } from "../../Component/AppPagination";
import { useDebounce } from "use-debounce";

export default function CarStatisticTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchDelayinMS = 1500;
  const pageSize = 20;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [carStatistics, setCarStatistics] = useState<CarStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  // DEBOUNCE Car speed
  const [carSpeed, setCarSpeed] = useState("");
  const [searchByCarSpeed] = useDebounce(carSpeed, searchDelayinMS);
  // DEBOUNCE Date from
  const [carDateFrom, setCarDateFrom] = useState("");
  const [searchCarDateFrom] = useDebounce(carDateFrom, searchDelayinMS);
  // DEBOUNCE Date to
  const [carDateUntil, setCarDateUntil] = useState("");
  const [searchCarDateUntil] = useDebounce(carDateUntil, searchDelayinMS);

  useEffect(() => {
    Agent.Catalog.getObjectsBySpeedDatefromDateUntil(
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

  return (
    <div data-testid="carStatisticTable-1">
      {/* DATE from -------------------------------------------------------------------------- */}
      <InputFieldAndResetButton
        theType="date"
        theValue={carDateFrom}
        setValueInInputField={(s) => setCarDateFrom(s)}
        onResetCurrentPageClick={(n) => setCurrentPage(n)}
        buttonText="Reset Date from"
      />
      {/* DATE to (Until) --------------------------------------------------------------------- */}
      <InputFieldAndResetButton
        theType="date"
        theValue={carDateUntil}
        setValueInInputField={(s) => setCarDateUntil(s)}
        onResetCurrentPageClick={(n) => setCurrentPage(n)}
        buttonText="Reset Date to"
      />
      {/* SPEED -------------------------------------------------------------------------------- */}
      <InputFieldAndResetButton
        theType="text"
        theValue={carSpeed}
        setValueInInputField={(s) => setCarSpeed(s)}
        onResetCurrentPageClick={(n) => setCurrentPage(n)}
        buttonText="Reset Speed"
      />
      <AppPagination
        items={carStatistics.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      {loading ? (
        <h1 className="flex justify-center text-3xl font-bold mb-4">
          Loading...
        </h1>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
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
                key={oneCarStatistic.id}
                carStatistic={oneCarStatistic}
              />
            ))}
          </tbody>
        </table>
      )}
      <br />
      <AppPagination
        items={carStatistics.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}

type InputFieldAndResetButtonProps = {
  theType: string;
  theValue: string;
  setValueInInputField: (s: string) => void;
  onResetCurrentPageClick: (n: number) => void;
  buttonText: string;
};

function InputFieldAndResetButton(props: InputFieldAndResetButtonProps) {
  const onHandleResetInInputField = () => {
    props.setValueInInputField("");
  };

  return (
    <div className="flex justify-center">
      <input
        type={props.theType}
        value={props.theValue}
        placeholder="Speed > or equal to.."
        onChange={(e) => {
          props.setValueInInputField(e.target.value);
          props.onResetCurrentPageClick(1); // Reset currentPage to 1 when searching
        }}
        className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
      />
      {/* Reset text in input field button */}
      <button
        onClick={onHandleResetInInputField}
        className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        {props.buttonText}
      </button>
    </div>
  );
}
