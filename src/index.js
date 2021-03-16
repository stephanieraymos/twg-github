import React from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
import { AppProvider } from "./context";
import App from "./App";
import { TruckProvider } from "./truckContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <TruckProvider>
        <App />
      </TruckProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
