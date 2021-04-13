import React, { useRef, useState, useEffect, useReducer } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAuthContext } from "../../auth";
import { inventoryURL } from "../../Pages/urls";

const FormAddInventory = ({
  manifestsCount,
  setManifestsCount,
  closeModal,
  userId,
  addNewTrucks
}) => {
  
  const form = useRef(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      setManifestsCount(0);
      postTrucks();
    } else {
      setValidated(true);
    }
  };

  const { accessToken } = useAuthContext();

  //^---- POST (ADD INVENTORY) ----
  const postTrucks = async () => {
    const data = new FormData(form.current);
    data.append("userId", userId);
    const contents = data.get("contents").split(",");
    data.delete("contents");
    contents.map((item) => data.append("contents", item));
    try {
      const response = await fetch(inventoryURL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
        body: data,
      });
      const newTruck = await response.json();
      addNewTrucks([newTruck]);
      closeModal();
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
        <Form.Group>
          <Form.Label className="form-label">Program</Form.Label>
          <Form.Control type="text" required name="source" />
          <Form.Control.Feedback type="invalid">
            Please enter program name (source).
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          {/* //^ ---------------------- RETAIL PRICE ------------------------- */}
          <Col>
            <Form.Label className="form-label">Retail Price</Form.Label>
            <Form.Control type="text" required name="retailPrice" />
            <Form.Control.Feedback type="invalid">
              Please enter retail price.
            </Form.Control.Feedback>
          </Col>
          {/* //^ ---------------------- OUR PRICE------------------------- */}
          <Col>
            <Form.Label className="form-label">Our Price</Form.Label>
            <Form.Control type="text" required name="price" />
            <Form.Control.Feedback type="invalid">
              Please enter our price.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          {/* //^ ---------------------- OUR COST------------------------- */}
          <Col>
            <Form.Label className="form-label">Our Cost</Form.Label>
            <Form.Control type="text" name="cost" />
            <Form.Control.Feedback type="invalid">
              Please enter our cost.
            </Form.Control.Feedback>
          </Col>
          {/* //^ ---------------------- COMMISSION ------------------------- */}
          <Col>
            <Form.Label className="form-label">Commission %</Form.Label>
            <Form.Control type="text" name="commission" />
            <Form.Control.Feedback type="invalid">
              Please enter commission rate.
            </Form.Control.Feedback>
          </Col>
        </Row>
        {/* //^ -------------------------- FOB ----------------------------- */}
        <Row>
          <Col>
            <Form.Label className="form-label">FOB</Form.Label>
            <Form.Control type="text" required name="fob" />
            <Form.Control.Feedback type="invalid">
              Where is the truck now?
            </Form.Control.Feedback>
          </Col>
          {/* //^ -------------------------- LANE ----------------------------- */}
          <Col>
            <Form.Label className="form-label">Lane</Form.Label>
            <Form.Control type="text" required name="lane" />
            <Form.Control.Feedback type="invalid">
              What lane is the truck in?
            </Form.Control.Feedback>
          </Col>
        </Row>

        {/* //^ ------------------------- CATEGORY ---------------------------- */}
        <Form.Group>
          <Form.Label className="form-label">Category</Form.Label>
          <Form.Control type="text" required name="category" />
          <Form.Control.Feedback type="invalid">
            Please specify the category.
          </Form.Control.Feedback>
        </Form.Group>

        {/* //^ ------------------------- CONTENTS ---------------------------- */}
        <Form.Group>
          <Form.Label className="form-label">Contents</Form.Label>
          <Form.Control type="text" name="contents" />
          <Form.Text muted>
            Separate each content with a comma, e.g., clothes,toys
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please specify the contents inside the truck.
          </Form.Control.Feedback>
        </Form.Group>

        {/* //^ ------------------------- OWNER ---------------------------- */}
        <Form.Group>
          <Form.Label className="form-label">Owner</Form.Label>
          <Form.Control type="text" required name="owner" />
          <Form.Control.Feedback type="invalid">
            Who owns this truck?
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          {/* //^ ---------------------- PALLET COUNT ------------------------- */}
          <Col>
            <Form.Label className="form-label">Pallets</Form.Label>
            <Form.Control type="text" required name="palletCount" />
            <Form.Control.Feedback type="invalid">
              Please enter # of pallets on truck.
            </Form.Control.Feedback>
          </Col>
          {/* //^ ---------------------- UNIT COUNT ------------------------- */}
          <Col>
            <Form.Label className="form-label">Units</Form.Label>
            <Form.Control type="text" required name="units" />
            <Form.Control.Feedback type="invalid">
              Please enter # of items in truck.
            </Form.Control.Feedback>
          </Col>
        </Row>

        {/* //^ ------------------------- FILES ---------------------------- */}
        <Row>
          <Col>
            <Form.Label className="form-label">Manifest</Form.Label>
            {Array(manifestsCount).fill(
              <>
                <Form.Control
                  type="file"
                  multiple
                  required
                  name="manifests"
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
            {manifestsCount == 0 ? (
              <Button
                onClick={() => setManifestsCount(manifestsCount + 1)}
                className="form-button"
                block
                style={{
                  width: "120px",
                  backgroundColor: "#000",
                  margin: "0rem",
                }}
              >
                Add Files
              </Button>
            ) : (
              <Button
                onClick={() => setManifestsCount(manifestsCount - 1)}
                className="form-button"
                block
                style={{
                  width: "120px",
                  backgroundColor: "#000",
                  margin: ".75rem 0rem",
                }}
              >
                Cancel
              </Button>
            )}
          </Col>

          {/* //^ ------------------------- STATUS ---------------------------- */}
          <Col>
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Control as="select" required name="status" custom>
              <option value="2">Available</option>
              <option value="1">Pending</option>
              <option value="0">Unavailable</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please specify the availability of the truck
            </Form.Control.Feedback>
          </Col>
        </Row>

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
