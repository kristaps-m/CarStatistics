import React from "react";
import { CarStatistic } from "../../app/models/CarStatistic";

interface CarStatisticRowProps {
  index: number;
  carStatistic: CarStatistic;
}

const CarStatisticRow: React.FC<CarStatisticRowProps> = ({
  index,
  carStatistic,
}) => {
  return (
    <tr>
      <td className="border border-black px-4 py-2">{index}</td>
      <td className="border border-black px-4 py-2">{carStatistic.id}</td>
      <td className="border border-black px-4 py-2">
        {carStatistic.carSpeedDate}
      </td>
      <td className="border border-black px-4 py-2">{carStatistic.carSpeed}</td>
      <td className="border border-black px-4 py-2">
        {carStatistic.carRegistrationNumber}
      </td>
    </tr>
  );
};

export default CarStatisticRow;
