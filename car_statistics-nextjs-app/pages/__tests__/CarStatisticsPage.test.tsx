import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import CarStatisticsPage from "../car-statistics";

afterEach(() => {
  cleanup();
});

test("should render Catalog feature/car-statistic", () => {
  render(<CarStatisticsPage />);
  const catalogElement = screen.getByTestId("carStatisticsPage-1");

  expect(catalogElement).toBeInTheDocument();
  expect(catalogElement).toHaveTextContent("Home");
  expect(catalogElement).toHaveTextContent("Car day graph");
  expect(catalogElement).toHaveTextContent("Car statistics table");
});
