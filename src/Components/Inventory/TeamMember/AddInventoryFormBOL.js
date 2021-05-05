import React, { useRef, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { authService } from "../../../authService";
import { inventoryPATH } from "../../../Pages/paths";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import cancel from "../../../img/cancel.svg";
import { useInventoryContext } from "../../../inventory";

const AddInventoryFormBOL = ({ addNewTrucks }) => {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [manifestsCount, setManifestsCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  let history = useHistory();
  let { url } = useRouteMatch();
  const { id } = authService.getUser();

  const { addInventory, inventory, setInventory } = useInventoryContext();

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

  const next = () => {
    history.goForward(`${inventoryPATH}/seal-form-page"`);
  };

  const removeImage = (index) => {
    const list = [...images];
    list[index] = -1;
    setImages(list);
  };

  //^---- POST (ADD INVENTORY) ----
  const postTrucks = () => {
    const data = new FormData(form.current);
    data.append("seller_id", id);
    addInventory(data).then((data) => {
      setInventory([...inventory, data]);
      next();
    });
  };

  return (
    <>
      <Form
        ref={form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "80%", margin: "24px auto" }}
      >
        {/* //^ ------------------- BOL ---------------------- */}
        <Form.Group>
          <Form.Label className="form-label">BOL Number</Form.Label>
          <Form.Control type="text" required name="bol" />
          <Form.Control.Feedback type="invalid">
            Please enter the BOL number for this truck.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Row>
            {/* //^ ---------------------- PALLET COUNT ------------------------- */}
            <Col>
              <Form.Label className="form-label">
                Expected Pallet Count
              </Form.Label>
              <Form.Control type="text" required name="pallet_count" />
              <Form.Control.Feedback type="invalid">
                Please enter the amount of pallets listed on the BOL.
              </Form.Control.Feedback>
            </Col>

            {/* //^ -------------------------- FOB ----------------------------- */}
            {/* Auto generate this value based on load id */}
            <Col>
              <Form.Label className="form-label">FOB</Form.Label>
              <Form.Control
                type="text"
                readOnly
                name="fob"
                value="fob will go here"
              />
              {/* FOB will be based on user that is logged in (their location specified in their acct) */}
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            {/* //^ ------------------------- IMAGES ---------------------------- */}
            <Col>
              <Form.Label className="form-label">Images</Form.Label>
              <Button
                onClick={() => {
                  setImages([...images, imageCount]);
                  setImageCount(imageCount + 1);
                }}
                className="form-button"
                block
                style={{
                  width: "150px",
                  backgroundColor: "#000",
                  margin: "0rem",
                }}
              >
                Add images
              </Button>

              {images.map((item, index) => {
                if (item == index) {
                  return (
                    <Row
                      key={index}
                      className="flex-start-center"
                      style={{ margin: "10px auto 0px" }}
                    >
                      <Col sm={10}>
                        <Form.Control
                          id={`form-image-${item}`}
                          type="file"
                          required
                          name="images"
                          style={{ fontSize: "1rem", color: "black" }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please add an image.
                        </Form.Control.Feedback>
                      </Col>
                      <Col sm={2}>
                        <Image
                          id={`form-image-cancel-${index}`}
                          src={cancel}
                          style={{ cursor: "pointer" }}
                          onClick={() => removeImage(index)}
                        />
                      </Col>
                    </Row>
                  );
                }
              })}
            </Col>
          </Row>
        </Form.Group>

        <div className="form-footer-container">
          <Button
            type="submit"
            className="orange-form-button"
            style={{ margin: "0 auto" }}
            block
          >
            Next
          </Button>
          {/* <Button
              type="submit"
              block
              className="orange-form-button"
              onClick={(e) => {
                e.preventDefault();
                history.push(`${url}/seal-form-page`);
              }}
            >
              Next
            </Button> */}
        </div>
      </Form>
    </>
  );
};

export default AddInventoryFormBOL;
