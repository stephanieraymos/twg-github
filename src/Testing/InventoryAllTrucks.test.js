import { render } from "@testing-library/react";
import React from "react";
import InventoryAllTrucks from "../Components/InventoryAllTrucks";

test("Renders the p tag", () => {
  const { getByText } = render(<InventoryAllTrucks />);
  const p = getByText(/Manifest/);
  expect(p).toHaveTextContent("Manifest");
});
