import React from "react";
import { render } from "@testing-library/react";
import AddInventoryButton from "../Components/AddInventoryButton"
import { useGlobalContext } from "../context";

const {truckLoad} = useGlobalContext();

describe("AddTrucks", () => {
  it("Adds the truck to inventory", () => {
    const { getByText } = render(<AddInventoryButton text="Hi" />);

    expect(getByText("Hi")).toBeTruthy();
  });
});
