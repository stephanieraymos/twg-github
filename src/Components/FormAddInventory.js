import React, { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuthContext } from "../auth";
import { useHistory } from "react-router-dom";
import { useTruck } from "../truckContext";

const FormAddInventory = ({ truckManifestCount, setTruckManifestCount, closeModal, userId}) => {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [addTruck] = useTruck();

  const addNewTrucks = (truck, user) => {
    addTruck(truck);
  };

  let history = useHistory();

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
    fetchAccessToken,
  } = useAuthContext();

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
        console.log("userId", userId);
      })
      .catch((error) => {
        history.push("/");
      });
  }, []);

  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    const data = new FormData(form.current);
    data.append("userId", userId);
    const truckContents = data.get("truckContents").split(",");
    data.delete("truckContents");
    truckContents.map((item) => data.append("truckContents", item));

    data.forEach((value, key) => console.log(key, value));
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
      history.push("/trucks");
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
{/* //^ ------------------- PROGRAM / SOURCE ---------------------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Program</Form.Label>
          <Form.Control type="text" required name="source" />
          <Form.Control.Feedback type="invalid">
            Please enter program (source).
          </Form.Control.Feedback>
        </Form.Group>

{/* //^ --------------------- RETAIL PRICE ------------------------ */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Retail</Form.Label>
          <Form.Control type="text" required name="retailPrice" />
          <Form.Control.Feedback type="invalid">
            Please enter the retail truck price.
          </Form.Control.Feedback>
        </Form.Group>

{/* //^ ---------------------- OUR PRICE ------------------------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Our Price</Form.Label>
          <Form.Control type="text" required name="price" />
          <Form.Control.Feedback type="invalid">
            Please enter our price.
          </Form.Control.Feedback>
        </Form.Group>

{/* //^ -------------------------- FOB ----------------------------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">FOB</Form.Label>
          <Form.Control type="text" required name="fob" />
          <Form.Control.Feedback type="invalid">
            Where is the truck now?
          </Form.Control.Feedback>
        </Form.Group>

{/* //^ ------------------------- CONTENTS ---------------------------- */}
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
          <Form.Label className="form-label">Category</Form.Label>
          <Form.Control type="text" required name="category" />
          <Form.Control.Feedback type="invalid">
            Please specify the category.
          </Form.Control.Feedback>
        </Form.Group>

{/* //^ ---------------------- PALLET COUNT ------------------------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Pallet</Form.Label>
          <Form.Control type="text" required name="palletCount" />
          <Form.Control.Feedback type="invalid">
            Pallet Count
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Units</Form.Label>
          <Form.Control type="text" required name="units" />
          <Form.Control.Feedback type="invalid">
            Please specify the # of items in the truck.
          </Form.Control.Feedback>
        </Form.Group>

{/* //^ ------------------------- FILES ---------------------------- */}
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
