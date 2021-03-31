import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTruckContext, useTruck } from "../truckContext";
import { useGlobalContext } from "../context";
import Alert from "./Alert";
import inventory from "../css/inventory.css";
import modalandsidebar from "../css/modalandsidebar.css";
import { Link } from "react-router-dom";
import cancel from "../img/cancel.svg";
import { useAuthContext } from "../auth";

const AddInventory = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [truckManifestCount, setTruckManifestCount] = useState(0)

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

  const form = useRef(null);

  const addTruck = useTruck()[3];
  // const { setTrucks, setPostRefresh } = useTruck();
  const { setTrucks } = useTruck();

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

  const handleSubmit = (event) => {
    // console.log(e.target);

    // e.preventDefault();
    // // setId(new Date().getTime().toString());
    // if (truckName) {
    //   // Show alert and add truck to inventory only if name is true and not editing
    //   showAlert(true, "success", "Truck Added");
    //   //Creating new truck
    //   let newTruck = [id, truckName, truckPrice, truckContents, truckManifest];
    //   console.log("Truck Manifest", truckManifest);

    //   //Spreading out current truckLoad and adding newTruck to the list
    //   setTruckLoad([...truckLoad, newTruck]);
    //   setTruckName("");
    //   setTruckPrice("");
    //   setTruckContents([]);
    //   setTruckManifest([]);
    //   closeModal();
    //   console.log("New Truck", newTruck); //Logging new truck for testing purposes
    // }
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      setTruckManifestCount(0)
      closeModal();
      postTrucks();
    }

    setValidated(true);
  };

  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    const data = new FormData(form.current);
    data.append("userId", userId);
    const truckContents = data.get("truckContents").split(",");
    data.delete("truckContents");
    truckContents.map(item => data.append("truckContents", item))
    try {
      const response = await fetch(
        "https://api.thewholesalegroup.com/v1/trucks/",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + accessToken,
          },
          body: data,
        }
      );
      console.log(response);
      const newTruck = await response.json();
      console.log(newTruck)
      props.addNewTrucks([newTruck])
    } catch (error) {
      console.log(error);
    }
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

            <Form
              ref={form}
              noValidate 
              validated={validated}
              onSubmit={handleSubmit}
              style={{ width: "85%", margin: "0% 5% 5%" }}
            >
              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="truckName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a truck name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Price</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="truckPrice"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a truck price.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Contents</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="truckContents"
                />
                <Form.Control.Feedback type="invalid">
                  Please specify the contents inside the truck.
                </Form.Control.Feedback>
                <Form.Text muted>
                  Separate each content with a comma, e.g., clothes,toys
                </Form.Text>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Manifest</Form.Label>
                {Array(truckManifestCount).fill(
                  <>
                    <Form.Control
                      type="file"
                      multiple
                      required
                      name="truckManifest"
                      style={{ fontSize: "1rem", color: "black" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please add a file. 
                    </Form.Control.Feedback>
                    <Form.Text muted>
                      Select multiple files by holding down the SHIFT key
                    </Form.Text>
                  </>
                )}
                {truckManifestCount == 0 ?
                  <Button
                    onClick={() => setTruckManifestCount(truckManifestCount + 1)}
                    className="form-button"
                    block
                    style={{ width: "150px", backgroundColor: "#000", alignSelf: "start", margin: "0rem" }}
                  >
                    Add Files
                  </Button>
                  :
                  <Button
                    onClick={() => setTruckManifestCount(truckManifestCount - 1)}
                    className="form-button"
                    block
                    style={{ width: "150px", backgroundColor: "#000", alignSelf: "start", margin: ".75rem 0rem" }}
                  >
                    Remove Files
                  </Button>
                }
              </Form.Group>

              <div className="form-footer-container">
                <Button
                  type="submit"
                  className="form-button"
                  block
                  style={{ width: "100%", backgroundColor: "#f47c20" }}
                >
                  Add Truck
                </Button>
              </div>
            </Form>
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
