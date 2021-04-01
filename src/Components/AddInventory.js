import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useGlobalContext } from "../context";
import FormAddInventory from "./FormAddInventory";
import inventory from "../css/inventory.css";
import modalandsidebar from "../css/modalandsidebar.css";
import cancel from "../img/cancel.svg";
import { useAuthContext } from "../auth";

const AddInventory = ({ addNewTrucks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckManifestCount, setTruckManifestCount] = useState(0);

  document.title = "Add Inventory";
  // const {
  //   truckLoad,
  //   setTruckLoad,
  //   id,
  //   truckName,
  //   setTruckName,
  //   truckPrice,
  //   setTruckPrice,
  //   truckContents,
  //   setTruckContents,
  //   truckManifest,
  //   setTruckManifest,

  //   showAlert,
  // } = useTruckContext();

  // const form = useRef(null);

  // const addTruck = useTruck()[3];
  // // const { setTrucks, setPostRefresh } = useTruck();
  // const { setTrucks } = useTruck();

  const { userId, setUserId } = useGlobalContext();

  const {
    accessToken: [accessToken, setAccessToken],
  } = useAuthContext();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="btn-container">
        <Button
          className="boot-button"
          style={{ margin: "1rem 0 -.75rem 0" }}
          onClick={openModal}
        >
          Add Truck
        </Button>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} centered>
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
              New Truck
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

          <hr
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "gray",
              opacity: "25%",
            }}
          />
          <FormAddInventory
            truckManifestCount={truckManifestCount}
            setTruckManifestCount={setTruckManifestCount}
            closeModal={closeModal}
            accessToken={accessToken}
            userId={userId}
            addNewTrucks={addNewTrucks}
          />
        </div>
      </Modal>
    </>
  );
};
// TP-51

export default AddInventory;
