import React, { useRef, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { authService } from "../../authService";
import { inventoryPATH } from "../../Pages/paths";
import { useHistory } from "react-router-dom";
import cancel from "../../img/cancel.svg";
import { useInventoryContext } from "../../inventory";

const AddInventoryFormConfirmDetails = ({ addNewTrucks }) => {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [manifestsCount, setManifestsCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  let history = useHistory();

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

  const back = () => {
    history.replace(inventoryPATH);
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
    const contents = data.get("contents").split(",");
    data.delete("contents");
    contents.map((item) => data.append("contents", item));
    addInventory(data).then((data) => {
      setInventory([...inventory, data]);
      back();
    });
  };

  return (
    <>
      <Form
        ref={form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "85%", margin: "24px auto" }}
      >
        {/* //^ ------------------- LOAD ID ---------------------- */}
        <Form.Group>
          <Form.Label className="form-label">Load ID</Form.Label>
          <Form.Control type="text" readOnly name="id" />
        </Form.Group>

        {/* //^ ------------------- PROGRAM / SOURCE ---------------------- */}
        <Form.Group>
          <Form.Label className="form-label">Program</Form.Label>
          <Form.Control type="text" readOnly name="program" />
        </Form.Group>

        {/* //^ ------------------------- CATEGORY ---------------------------- */}
        <Form.Group>
          <Form.Label className="form-label">Category</Form.Label>
          <Form.Control type="text" readOnly name="category" />
        </Form.Group>

        <Form.Group>
          {/* //^ ------------------------- CONDITION ---------------------------- */}
          <Form.Label className="form-label">Condition</Form.Label>
          <Form.Control
            as="text"
            readOnly
            name="condition"
            custom
          ></Form.Control>
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
            className="form-button"
            block
            style={{ width: "100%", backgroundColor: "#f47c20" }}
          >
            Confirm load
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddInventoryFormConfirmDetails;
