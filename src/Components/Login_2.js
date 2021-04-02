import React, { useState, useEffect } from "react";
import FormLogin from "./FormLogin";
import modalandsidebar from "../css/modalandsidebar.css";
// import TableInventory from "./TableInventory";
import logo from "../img/w-logo.png";
import cancel from "../img/cancel.svg";
import Signup2 from "./Signup_2";
import { useAuthContext } from "../auth";
import { useTruck } from "../truckContext";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";

const LoginModal = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { authenticate } = useAuthContext();
  const [trucks] = useTruck();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    openModal();
  }, [])

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
        <div className="table-wrapper">
          <div className="header-items">
            <span className="all-trucks-table-header-name truck">
              TRUCK NAME
            </span>
            <span className="all-trucks-table-header-price price">PRICE</span>
            <span className="all-trucks-table-header-contents contents">
              CONTENTS
            </span>
            <span className="all-trucks-table-header-status status">
              STATUS
            </span>
          </div>
          <div className="truckLoad-list">
            {trucks.map((truck) => {
              let {
                id,
                truckName,
                truckPrice,
                truckContents,
                truckManifestId,
                status,
              } = truck;

              return (
                <div className="truckLoad" key={id}>
                  <p className="items all-trucks-name text-truncate">
                    {truckName}
                  </p>
                  <p className="items all-trucks-price text-truncate">
                    ${truckPrice}
                  </p>
                  <p className="items all-trucks-contents text-truncate">
                    {truckContents}
                  </p>

                  <span className="items all-trucks-status text-truncate">
                    {status >= 1 ? (
                      <p className="available-status">Available</p>
                    ) : (
                      <p className="not-available-status">Not Available</p>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <Modal show={isModalOpen} centered style={{left: "25%"}}>
            <div
              className="form-body-container"
              style={{ width: "90%", alignSelf: "center" }}
            >
              <div
                className="form-header-container"
                style={{
                  width: "85%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: "1rem 1rem 0rem",
                }}
              >
                <div
                  className="form-label"
                  style={{ color: "black", fontSize: "36px" }}
                >
                  Login
                </div>
                <button
                  style={{
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                >
                  <img src={cancel} alt="cancel" onClick={closeModal} />
                </button>
              </div>
              <FormLogin />
            </div>
          </Modal>

          {/* <div className="form-body-container" style={{zIndex:1}}>
            <FormLogin />
          </div> */}
        </div>

        // // <TableInventory>
        //   <FormLogin />
        // // </TableInventory>
      )}
    </>
  );
};

export default LoginModal;
