import React, { useState } from "react";
import FormLogin from "./FormLogin";
import modalandsidebar from "../css/modalandsidebar.css";
import InventoryAllTrucks from "./InventoryAllTrucks"
import logo from "../img/w-logo.png";
import Signup2 from "./Signup_2";

const LoginModal = () => {
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <>
      <Signup2 />
      {width < 1000 ? (
        <div className="form-container">
          <img
            src={logo}
            alt="logo image"
            style={{ width: "200px", backgroundColor: "#13131f" }}
          />
          <h1
            className="form-header"
            style={{
              width: "90%",
              color: "white",
              textShadow: "none",
              textAlign: "center",
              fontSize: "48px",
            }}
          >
            The Wholesale Group
          </h1>

          <div className="form-body-container">
            <FormLogin />
          </div>
        </div>
      ) : (
        <div className="form-container" style={{ flexDirection: "row" }}>
          <div className="form-header-container">
            <img
              src={logo}
              alt="logo image"
              style={{ width: "200px", backgroundColor: "#13131f" }}
            />
            <h1
              className="form-header"
              style={{
                width: "90%",
                color: "white",
                textShadow: "none",
                textAlign: "center",
                fontSize: "48px",
              }}
            >
              The Wholesale Group
            </h1>
          </div>
          <div className="form-body-container">
            <FormLogin />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
