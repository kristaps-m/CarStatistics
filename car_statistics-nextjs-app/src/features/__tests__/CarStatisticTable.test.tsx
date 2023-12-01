import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import CarStatisticTable from "../CarStatistic/CarStatisticTable";

afterEach(() => {
  cleanup();
});

test("should render CarStatisticTable feature/car-statistic", () => {
  render(<CarStatisticTable />);
  const carStatisticListElement = screen.getByTestId("carStatisticTable-1");

  expect(carStatisticListElement).toBeInTheDocument();
  expect(carStatisticListElement).toHaveTextContent("Reset");
});
