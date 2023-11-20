import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import CarStatisticDetails from "../CarStatisticDetails";

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

afterEach(() => {
  cleanup();
});

test("should render CarStatisticDetails pages/car-statistics", () => {
  // Mock the useRouter implementation
  const mockUseRouter = {
    query: {
      carStatisticId: "1",
    },
  };
  jest
    .spyOn(require("next/router"), "useRouter")
    .mockReturnValue(mockUseRouter);

  render(<CarStatisticDetails />);
  const productDetailsElement = screen.getByTestId("carStatisticDetails-1");

  expect(productDetailsElement).toBeInTheDocument();
});
