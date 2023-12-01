import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import HomePage from "../Home/HomePage";
import React from "react";

afterEach(() => {
  cleanup();
});

test("should render HomePage feature/home", () => {
  render(<HomePage />);
  const homePageElement = screen.getByTestId("homePage-1");

  expect(homePageElement).toBeInTheDocument();
  expect(homePageElement).toHaveTextContent(
    "Explore our wide range of high-quality features."
  );
  expect(homePageElement).toHaveTextContent("Top Speed of the previous month:");
  expect(homePageElement).toHaveTextContent("Remember to be safe on road!");
  expect(homePageElement).toHaveTextContent(
    "DISCLAIMER: Images in routes: http://localhost:3000/car-statistics/id are just to represent possible picture size in a real application. Do not take what's displayed in picture seriously."
  );
});

test("test", () => {
  expect(true).toBe(true);
});
