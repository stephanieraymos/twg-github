import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import cancel from "../../img/cancel.svg";
import undo from "../../img/undo.svg";

const UpdateTruckForm = ({
  form,
  validated,
  handleSubmit,
  source,
  price,
  cost,
  commission,
  retailPrice,
  category,
  contents,
  units,
  palletCount,
  fob,
  setStatus,
  files,
  manifestIds,
  oldManifestIds,
  setOldManifestIds,
  redirect,
  status,
  owner,
}) => {
  const [manifestsCount, setManifestsCount] = useState(0);

  return (
    <>
      <Form
        ref={form}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="update-truck-form"
      >
        {/* //^ ------------PROGRAM------------ */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Program</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={source}
            name="source"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a truck name.
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          {/* //^ ---------------------- RETAIL PRICE ------------------------- */}
          <Col>
            <Form.Label className="form-label">Retail Price</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={retailPrice}
              name="retailPrice"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck price.
            </Form.Control.Feedback>
          </Col>
          {/* //^ ---------------------- OUR PRICE------------------------- */}
          <Col>
            <Form.Label className="form-label">Our Price</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={price}
              name="price"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a truck price.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          {/* //^ ---------------------- OUR COST------------------------- */}
          <Col>
            <Form.Label className="form-label">Our Cost</Form.Label>
            <Form.Control type="text" defaultValue={cost} name="cost" />
            <Form.Control.Feedback type="invalid">
              Please enter our cost.
            </Form.Control.Feedback>
          </Col>
          {/* //^ ---------------------- COMMISSION ------------------------- */}
          <Col>
            <Form.Label className="form-label">Commission %</Form.Label>
            <Form.Control type="text" defaultValue={commission} name="cost" />
            <Form.Control.Feedback type="invalid">
              Please enter commission rate.
            </Form.Control.Feedback>
          </Col>
        </Row>

        {/* //^ ----------CATEGORY---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Category</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={category}
            name="category"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a company name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* //^ ----------OWNER---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Owner</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={owner}
            name="category"
          />
          <Form.Control.Feedback type="invalid">
            Who owns this truck?
          </Form.Control.Feedback>
        </Form.Group>

        {/* //^ ----------CONTENTS---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Contents</Form.Label>
          <Form.Control type="text" defaultValue={contents} name="contents" />
          <Form.Control.Feedback type="invalid">
            Please specify the contents inside the truck.
          </Form.Control.Feedback>
          <Form.Text muted>
            Separate each content with a comma (no space character), e.g.,
            clothes,toys
          </Form.Text>
        </Form.Group>

        <Row>
          {/* //^ ----------UNITS---------- */}
          <Col>
            <Form.Label className="form-label">Units</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={units}
              name="units"
            />
            <Form.Control.Feedback type="invalid">
              Please add the # of units in the truck.
            </Form.Control.Feedback>
          </Col>

          {/* //^ ----------PALLETS---------- */}
          <Col>
            <Form.Label className="form-label">Pallets</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={palletCount}
              name="palletCount"
            />
            <Form.Control.Feedback type="invalid">
              Please add the # of pallets in the truck.
            </Form.Control.Feedback>
          </Col>
        </Row>
        {/* //^ ----------FOB---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">FOB</Form.Label>
          <Form.Control type="text" required defaultValue={fob} name="fob" />
          <Form.Control.Feedback type="invalid">
            Please add the # of pallets in the truck.
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          {/* //^ ----------STATUS---------- */}
          <Col>
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Check
              style={{ color: "black" }}
              type="switch"
              id="custom-switch"
              name="status"
              checked={status}
              label="Available"
              onChange={() => setStatus(status ? 0 : 1)}
            />
          </Col>

          {/* //^ ----------FILES---------- */}
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
                onClick={() => setManifestsCount(manifestsCount - 1)}
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
          </Col>
        </Row>

        {files.map((manifest, index) => {
          const id = manifestIds[index];
          const { manifests, manifestName } = manifest;
          return (
            <>
              <Form.Row key={id}>
                <Col sm={11}>
                  <Form.Control
                    defaultValue={manifestName}
                    readOnly
                    style={{ cursor: "pointer" }}
                    onClick={
                      () =>
                        window.open(manifests, "_blank") ||
                        window.location.replace(manifests) //Opens in new tab || Opens in same tab if pop ups are blocked
                    }
                  />
                </Col>
                <Col sm={1}>
                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                      height: "100%",
                    }}
                  >
                    {oldManifestIds.includes(id) ? (
                      <img
                        src={undo}
                        alt="undo"
                        onClick={() => {
                          console.log("id to be added back", id);
                          setOldManifestIds(
                            oldManifestIds.filter((item) => item !== id)
                          );
                          console.log("old manifest id", oldManifestIds);
                        }}
                      />
                    ) : (
                      <img
                        src={cancel}
                        alt="remove"
                        onClick={() => {
                          console.log("id to be deleted", id);
                          setOldManifestIds([...oldManifestIds, id]);
                          console.log("old manifest id", oldManifestIds);
                        }}
                      />
                    )}
                  </button>
                </Col>
              </Form.Row>
              {oldManifestIds.includes(id) && (
                <Form.Text style={{ color: "red" }}>
                  Marked for deletion
                </Form.Text>
              )}
            </>
          );
        })}

        <div className="form-footer-container">
          <Button
            type="submit"
            className="form-button"
            block
            style={{
              width: "100%",
              backgroundColor: "#f47c20",
              margin: "1.5rem 0rem 0rem",
            }}
          >
            Update Truck
          </Button>

          <Button
            type="button"
            onClick={() => {
              redirect();
            }}
            className="form-button"
            block
            style={{
              width: "100%",
              backgroundColor: "#000",
              margin: ".5rem 0rem 0rem",
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateTruckForm;
