import React, { useState, useEffect } from "react";
import FormLogin from "./FormLogin";
import modalandsidebar from "../css/modalandsidebar.css";
import InventoryAllTrucks from "./InventoryAllTrucks";
import logo from "../img/w-logo.png";
import Signup2 from "./Signup_2";
import { useAuthContext } from "../auth";
import { useHistory } from "react-router-dom";


const LoginModal = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { authenticate } = useAuthContext();

  let history = useHistory();
  useEffect(() => {
    authenticate(() => {
      history.push("/dashboard");
    });
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // clean up code
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
