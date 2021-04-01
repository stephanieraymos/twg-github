import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

const FormAddInventory = ({ truckManifestCount, setTruckManifestCount, closeModal, accessToken, userId, addNewTrucks }) => {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      setTruckManifestCount(0);
      closeModal();
      postTrucks();
    } else {
      setValidated(true);
    }
  };

  const {
    setAccessToken,
    setRefreshToken,
    fetchAccessToken,
  } = useAuthContext();

  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    const data = new FormData(form.current);
    data.append("userId", userId);
    const truckContents = data.get("truckContents").split(",");
    data.delete("truckContents");
    truckContents.map((item) => data.append("truckContents", item));
    try {
      const response = await fetch(
        "https://api.thewholesalegroup.com/v1/trucks/edit/",
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
      console.log(newTruck);
      addNewTrucks([newTruck]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        ref={form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "85%", margin: "0% 5% 5%" }}
      >
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control type="text" required name="truckName" />
          <Form.Control.Feedback type="invalid">
            Please enter a truck name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Price</Form.Label>
          <Form.Control type="text" required name="truckPrice" />
          <Form.Control.Feedback type="invalid">
            Please enter a truck price.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Company</Form.Label>
          <Form.Control type="text" required name="company" />
          <Form.Control.Feedback type="invalid">
            Please enter a company name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Contents</Form.Label>
          <Form.Control type="text" required name="truckContents" />
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
          {truckManifestCount == 0 ? (
            <Button
              onClick={() => setTruckManifestCount(truckManifestCount + 1)}
              className="form-button"
              block
              style={{
                width: "150px",
                backgroundColor: "#000",
                alignSelf: "start",
                margin: "0rem",
              }}
            >
              Add Files
            </Button>
          ) : (
            <Button
              onClick={() => setTruckManifestCount(truckManifestCount - 1)}
              className="form-button"
              block
              style={{
                width: "150px",
                backgroundColor: "#000",
                alignSelf: "start",
                margin: ".75rem 0rem",
              }}
            >
              Remove Files
            </Button>
          )}
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
    </>
  );
};

export default FormAddInventory;
