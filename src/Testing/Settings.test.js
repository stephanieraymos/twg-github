import { render } from "@testing-library/react";
import React from "react";
import Settings from "../Components/Settings";

test("Renders the h1", () => {
  const { getByText } = render(<Settings />);
  const h1 = getByText(/Settings Page/);
  expect(h1).toHaveTextContent("Settings Page");
});
