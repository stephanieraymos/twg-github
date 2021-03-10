import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/";
import React from "react";
import Inventory from "../Components/Inventory";

afterEach(cleanup); //After each test, clean up

it("renders", () => {
  const { asFragment } = render(<Inventory text="YO!" />);
  expect(asFragment()).toMatchSnapshot();
});

it("inserts text in each p tag", () => {
  const { getByTestId, getByText } = render(<Inventory text="YO!" />);
  expect(getByTestId("manifestEl")).toHaveTextContent("Yo");
  expect(getByText("Yo")).toHaveClass("items");
});


test("Renders the top p tag", () => {
    const { getByText } = render(<Inventory />);
    const p = getByText(/PRICE/);
    expect(p).toHaveTextContent("PRICE");
  });