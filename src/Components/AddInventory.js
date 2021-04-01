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
        {/* <Form ref={form} onSubmit={handleSubmit} method="post">
          <Modal.Header>
            <h1 className="modal-header">Add Truck</h1>
            <button onClick={closeModal} className="close-trucks-modal ml-auto">
              X
            </button>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white" }}>
            <Form.Group className="center-form-group">
              <Form.Label style={{ color: "black" }}>Truck Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={null}
                name="truckName"
              />
            </Form.Group>

            <Form.Group className="center-form-group">
              <Form.Label style={{ color: "black" }}>Truck Price</Form.Label>
              <Form.Control
                type="text"
                required
                value={null}
                name="truckPrice"
              />
            </Form.Group>

            <Form.Group className="center-form-group">
              <Form.Label style={{ color: "black" }}>Truck Contents</Form.Label>
              {Array(truckContentCount).fill(
                <Form.Control
                  type="text"
                  required
                  value={null}
                  name="truckContents"
                />
              )}
              <Button
                onClick={() => setTruckContentCount(truckContentCount + 1)}
                variant="dark"
                className="form-button"
                style={{ width: "200px", backgroundColor: "#000", alignSelf: "start", margin: "1rem 0rem 0rem" }}>
                  Add More Contents
              </Button>
            </Form.Group>

            <Form.Group className="center-form-group">
              <Form.Label style={{ color: "black" }}>Truck Manifest</Form.Label>
              <Form.Control
                type="file"
                multiple
                value={null}
                name="truckManifest"
                style={{ fontSize: "1rem", color: "black" }}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={postTrucks}
              className="boot-button mr-auto ml-auto"
            >
              Add Truck
            </Button>
          </Modal.Footer>
        </Form> */}
      </Modal>
    </>
  );
};
// TP-51

export default AddInventory;
