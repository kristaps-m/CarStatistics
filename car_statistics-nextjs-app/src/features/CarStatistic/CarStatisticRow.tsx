import React from "react";
import { CarStatistic } from "../../app/Models/CarStatistic";

interface CarStatisticRowProps {
  carStatistic: CarStatistic;
}

const CarStatisticRow: React.FC<CarStatisticRowProps> = ({ carStatistic }) => {
  return (
    <tr data-testid="carStatisticRow-1">
      <td className="border border-black px-4 py-2">
        {new Date(carStatistic.carSpeedDate).toLocaleDateString("en-GB")}
      </td>
      <td className="border border-black px-4 py-2">{carStatistic.carSpeed}</td>
      <td className="border border-black px-4 py-2">
        {carStatistic.carRegistrationNumber}
      </td>
      <td className="border border-black px-4 py-2">
        <a href={`/car-statistics/${carStatistic.id}`}>
          <button className="mt-1 px-1 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            View
          </button>
        </a>
      </td>
    </tr>
  );
};

export default CarStatisticRow;
