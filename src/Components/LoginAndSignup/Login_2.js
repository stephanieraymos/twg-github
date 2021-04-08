import React, { useState, useEffect } from "react";
import FormLogin from "./FormLogin";
import modalandsidebar from "../../css/modalandsidebar.css";
// import TableInventory from "./TableInventory";
import logo from "../../img/w-logo.png";
import cancel from "../../img/cancel.svg";
import Signup2 from "./Signup_2";
import { useAuthContext } from "../../auth";
import { useTruck } from "../../truckContext";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

const LoginModal = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { fetchAccessToken } = useAuthContext();
  const [trucks] = useTruck();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    fetchAccessToken
      .then((token) => {
        let { from } = { from: { pathname: "/dashboard" } };
        //history.push("/dashboard");
        history.replace(from);
      })
      .catch((error) => {console.log(error)});

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // clean up code
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openAlertModal = () => {
    setIsAlertModalOpen(true);
    console.log("It's working");
    console.log(isAlertModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(true);
  };
  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  useEffect(() => {
    openModal();
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
        <div className="table-wrapper">
          <div className="header-items">
            <span className="all-trucks-table-header-load truck">ID</span>
            <span className="all-trucks-table-header-program program">
              PROGRAM
            </span>
            <span className="all-trucks-table-header-category category">
              CATEGORY
            </span>
            <span className="all-trucks-table-header-units units">UNITS</span>
            <span className="all-trucks-table-header-pallets pallets">
              PALLETS
            </span>
            <span className="all-trucks-table-header-fob fob">FOB</span>
            <span className="all-trucks-table-header-retail retail">
              RETAIL
            </span>
            <span className="all-trucks-table-header-price price">PRICE</span>
          </div>
          <div className="truckLoad-list">
            {trucks.map((truck) => {
              let {
                id,
                loadId,
                source,
                price,
                category,
                retailPrice,
                units,
                palletCount,
                fob,
                contents,
                manifestIds,
                status,
              } = truck;

              return (
                <div className="truckLoad" key={id}>
                  <p className="items all-trucks-load text-truncate">{loadId}</p>
                  <p className="items all-trucks-program text-truncate">
                    {source}
                  </p>
                  <p className="items all-trucks-category text-truncate">
                    {category}
                  </p>

                  <span className="items all-trucks-units text-truncate">
                    {units}
                  </span>
                  <span className="items all-trucks-pallets text-truncate">
                    {palletCount}
                  </span>
                  <span className="items all-trucks-fob text-truncate">
                    {fob}
                  </span>
                  <span className="items all-trucks-retail text-truncate">
                    ${retailPrice}
                  </span>
                  <span className="items all-trucks-price text-truncate">
                    ${price}
                  </span>
                </div>
              );
            })}
          </div>

          <Modal
            show={isModalOpen}
            onHide={openAlertModal}
            centered
            style={{ left: "25%" }}
          >
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
              </div>
              <FormLogin />
            </div>
          </Modal>

          <Modal
            id="modal"
            show={isAlertModalOpen}
            onHide={closeAlertModal}
            centered
            style={{ right: "25%" }}
          >
            <div
              className="alert-modal-container"
              style={{
                width: "90%",
                height: "10rem",
                alignSelf: "center",
              }}
            >
              <div
                className="alert-modal-body-wrapper"
                style={{
                  width: "85%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  className="form-label"
                  style={{ color: "black", fontSize: "36px" }}
                >
                  Attention
                </div>
                <button
                  style={{
                    background: "transparent",
                    borderColor: "transparent",
                    display: "flex",
                  }}
                >
                  <img src={cancel} alt="cancel" onClick={closeAlertModal} />
                </button>
              </div>
              <h5 className="alert-modal-body">
                Please login to interact with this table
              </h5>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default LoginModal;
