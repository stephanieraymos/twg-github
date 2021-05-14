import React, { useState, useEffect } from "react";
import FormLogin from "./FormLogin";
import modalandsidebar from "../../css/modalandsidebar.css";
// import TableInventory from "./TableInventory";
import logo from "../../img/w-logo.png";
import cancel from "../../img/cancel.svg";
import Signup2 from "./Signup_2";
import { useTruck } from "../../context/truckContext";
import { Modal, Table } from "react-bootstrap";

const LoginModal = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [trucks] = useTruck();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  useEffect(() => {
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

  function dynamicSort(property) {
    return function (a, b) {
      return b[property] - a[property];
    };
  }
  trucks.sort(dynamicSort("status"));

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
          <Table responsive>
            <thead className="header-items">
              <tr>
                <th id="id">ID</th>
                <th id="program">PROGRAM</th>
                <th> CATEGORY</th>
                <th>UNITS</th>
                <th>PALLETS</th>
                <th>FOB</th>
                <th>RETAIL</th>
                <th>PRICE</th>
                <th width={"5px"}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck) => {
                let {
                  id,
                  loadId,
                  price,
                  source,
                  category,
                  units,
                  palletCount,
                  fob,
                  retailPrice,
                  status,
                } = truck;
                return (
                  <tr
                    className={`${
                      status === 0
                        ? "status-row-red"
                        : status === 1
                        ? "status-row-yellow"
                        : "status-row-green"
                    }`}
                    key={id}
                  >
                    <td>{loadId}</td>
                    <td>{source}</td>
                    <td>{category}</td>
                    <td>{units}</td>
                    <td>{palletCount}</td>
                    <td>{fob}</td>
                    <td>${retailPrice}</td>
                    <td>${price}</td>
                    <td style={{ fontSize: "10px", textAlign: "center" }}>{`${
                      status === 0
                        ? "sold"
                        : status === 1
                        ? "pending"
                        : "available"
                    }`}</td>
                    {/* <td><td className={`${
                    status === 0
                      ? "s-circle"
                      : status === 1
                      ? "a-circle"
                      : "p-circle"
                  }`}>{status}</td></td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
