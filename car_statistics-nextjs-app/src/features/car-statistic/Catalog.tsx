import { NavigationButtons } from "@/app/NavigationButtons";
import CarStatisticTable from "./CarStatisticTable";

export default function Catalog() {
  return (
    <div data-testid="catalog-1">
      <NavigationButtons />
      <div className="flex justify-center">
        <CarStatisticTable />
      </div>
    </div>
  );
}
