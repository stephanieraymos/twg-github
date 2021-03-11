import React from "react";
import { render } from "@testing-library/react";
import AddInventory from "../Components/AddInventory"
import { useGlobalContext } from "../context";

const {truckLoad} = useGlobalContext();

describe("AddTrucks", () => {
  it("Adds the truck to inventory", () => {
    const { getByText } = render(<AddInventory text="Hi" />);

    expect(getByText("Hi")).toBeTruthy();
  });
});
