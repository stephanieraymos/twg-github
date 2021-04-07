import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FormAddInventory from "./FormAddInventory";
import cancel from "../../img/cancel.svg";

const AddInventory = ({ addNewTrucks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manifestsCount, setManifestsCount] = useState(0);

  document.title = "Add Inventory";

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* //^ ---- ADD LOAD BUTTON ---- */}
      <div className="btn-container">
        <Button
          className="boot-button"
          style={{ margin: "1rem 0 -.75rem 0" }}
          onClick={openModal}
        >
          Add Load
        </Button>
      </div>
      {/* //^ ---- ADD LOAD MODAL START ---- */}
      <Modal show={isModalOpen} onHide={closeModal} centered>
        <div
          className="form-body-container"
          style={{ width: "40rem", alignSelf: "center" }}
        >
          {/* //^ MODAL HEADER */}
          <div
            className="form-header-container"
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "1rem 1rem 0rem",
            }}
          >
            <div
              className="form-label"
              style={{ color: "black", fontSize: "36px" }}
            >
              New Load
            </div>
            {/* //^ CLOSE MODAL BUTTON */}
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
          {/* //^ MODAL BODY */}
          <FormAddInventory
            manifestsCount={manifestsCount}
            setManifestsCount={setManifestsCount}
            closeModal={closeModal}
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
