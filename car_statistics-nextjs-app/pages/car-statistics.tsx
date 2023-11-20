import { NavigationButtons } from "@/app/NavigationButtons";
import CarStatisticTable from "@/features/car-statistic/CarStatisticTable";

const CarStatisticsPage = () => {
  return (
    <div data-testid="carStatisticsPage-1">
      <NavigationButtons />
      <div className="flex justify-center">
        <CarStatisticTable />
      </div>
    </div>
  );
};

export default CarStatisticsPage;
