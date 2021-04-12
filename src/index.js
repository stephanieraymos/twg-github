import React from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
import { AppProvider } from "./context";
import App from "./App";
import { TruckProvider } from "./truckContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./auth"

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
