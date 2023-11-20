import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import HomePage from "../home/HomePage";
import React from "react";

afterEach(() => {
  cleanup();
});

test("should render HomePage feature/home", () => {
  render(<HomePage />);
  const homePageElement = screen.getByTestId("homePage-1");

  expect(homePageElement).toBeInTheDocument();
  expect(homePageElement).toHaveTextContent(
    "Explore our wide range of high-quality products."
  );
  expect(homePageElement).toHaveTextContent(
    "DISCLAIMER: Images are just to represent possible picture size in a real application. Do not take what's displayed in pictures seriously."
  );
});

test("test", () => {
  expect(true).toBe(true);
});
