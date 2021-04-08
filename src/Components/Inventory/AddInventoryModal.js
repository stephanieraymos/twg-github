import React, { useState } from "react";
import FormAddInventory from "./FormAddInventory";
import { Modal } from "react-bootstrap";
import { useGlobalContext } from "../../context";

const AddInventoryModal = ({
  isModalOpen,
  setIsModalOpen,
  cancel,
  addNewTrucks,
}) => {
  const [manifestsCount, setManifestsCount] = useState(0);
  // const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const {
    userId,
    setUserId,
  } = useGlobalContext();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

export default AddInventoryModal;
