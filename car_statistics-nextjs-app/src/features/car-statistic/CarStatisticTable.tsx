import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { CarStatistic } from "../../app/models/CarStatistic";
import CarStatisticRow from "./CarStatisticRow";
import AppPagination, { paginate } from "../../component/AppPagination";
import { useDebounce } from "use-debounce";

export default function ProductList() {
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
  const [carDateUntil, setCarDateUntil] = useState("");
  const [searchCarDateUntil] = useDebounce(carDateUntil, searchDelayinMS);
  const handleDateUntilReset = () => {
    setCarDateUntil("");
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
      {/* DATE to ---------------------------------------------------------------------------- */}
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
        <h1>Loading...</h1>
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
      <button
        onClick={onHandleResetInInputField}
        className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        {props.buttonText}
      </button>
    </div>
  );
}
