import Graph from "../src/features/car-graph/Graph";
import { NavigationButtons } from "@/app/NavigationButtons";

const CarGraphPage = () => {
  return (
    <div>
      <div>
        <NavigationButtons />
      </div>
      <Graph />
    </div>
  );
};

export default CarGraphPage;
