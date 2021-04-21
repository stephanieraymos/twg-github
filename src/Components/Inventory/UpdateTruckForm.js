import React, { useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import cancel from "../../img/cancel.svg";
import undo from "../../img/undo.svg";

import { useTruckContext } from "../../truckContext";

const UpdateTruckForm = ({
  form,
  validated,
  handleSubmit,
  oldManifestIds,
  setOldManifestIds,
  oldImageIds,
  setOldImageIds,
  redirect,
}) => {
  const [manifestsCount, setManifestsCount] = useState(0);
  const [tempImages, setTempImages] = useState([]);
  const [tempImageCount, setTempImageCount] = useState(0);

  const {
    source, setSource,
    retailPrice, setRetailPrice,
    price, setPrice,
    status, setStatus,
    contents, setContents,
    category, setCategory,
    units, setUnits,
    palletCount, setPalletCount,
    fob, setFob,
    manifestIds,
    files,
    owner, setOwner,
    cost, setCost,
    commission, setCommission,
    lane, setLane,
    fileCount, setFileCount,
    imageCount, setImageCount,
    imageIds,
    images
  } = useTruckContext();

  const removeImage = index => {
    const list = [...tempImages];
    list[index] = -1;
    setTempImages(list);
    setImageCount(imageCount - 1);
  };

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
            onChange={(e) => setSource(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a truck name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Row>
            {/* //^ ---------------------- RETAIL PRICE ------------------------- */}
            <Col>
              <Form.Label className="form-label">Retail Price</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={retailPrice}
                name="retailPrice"
                onChange={(e) => setRetailPrice(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a truck price.
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            {/* //^ ---------------------- OUR COST------------------------- */}
            <Col>
              <Form.Label className="form-label">Our Cost</Form.Label>
              <Form.Control
                type="text"
                defaultValue={cost}
                name="cost"
                onChange={(e) => setCost(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter our cost.
              </Form.Control.Feedback>
            </Col>
            {/* //^ ---------------------- COMMISSION ------------------------- */}
            <Col>
              <Form.Label className="form-label">Commission %</Form.Label>
              <Form.Control
                type="text"
                defaultValue={commission}
                name="commission"
                onChange={(e) => setCommission(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter commission rate.
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        {/* //^ ----------CATEGORY---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Category</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
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
            name="owner"
            onChange={(e) => setOwner(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Who owns this truck?
          </Form.Control.Feedback>
        </Form.Group>

        {/* //^ ----------CONTENTS---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Contents</Form.Label>
          <Form.Control
            type="text"
            defaultValue={contents}
            name="contents"
            onChange={(e) => setContents(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please specify the contents inside the truck.
          </Form.Control.Feedback>
          <Form.Text muted>
            Separate each content with a comma (no space character), e.g.,
            clothes,toys
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Row>
            {/* //^ ----------UNITS---------- */}
            <Col>
              <Form.Label className="form-label">Units</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={units}
                name="units"
                onChange={(e) => setUnits(e.target.value)}
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
                onChange={(e) => setPalletCount(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please add the # of pallets in the truck.
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          {/* //^ ----------FOB---------- */}
          <Row className="center-form-group">
            <Col>
              <Form.Label className="form-label">FOB</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={fob}
                name="fob"
                onChange={(e) => setFob(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please add the # of pallets in the truck.
              </Form.Control.Feedback>
            </Col>
            {/* //^ ----------LANE---------- */}
            <Col>
              <Form.Label className="form-label">Lane</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={lane}
                name="lane"
                onChange={(e) => setLane(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Which lane is this truck in?
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            {/* //^ ----------STATUS---------- */}
            <Col>
              <Form.Label className="form-label">Status</Form.Label>

              <Form.Control
                as="select"
                required
                name="status"
                custom
                placeholder={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              >
                <option value="" disabled hidden>
                  {status === 0
                    ? "Unavailable"
                    : status === 1
                    ? "Pending"
                    : "Available"}
                </option>
                <option value="2">Available</option>
                <option value="1">Pending</option>
                <option value="0">Unavailable</option>
              </Form.Control>
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
                  onClick={() => {
                    setManifestsCount(manifestsCount + 1);
                    setFileCount(fileCount + 1);
                  }}
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
                  onClick={() => {
                    setManifestsCount(manifestsCount - 1);
                    setFileCount(fileCount - 1);
                  }}
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
        </Form.Group>

        {files.map((file, index) => {
          const id = manifestIds[index];
          const { manifest, manifestName } = file;
          return (
            <>
              <Form.Row key={id}>
                <Col sm={11}>
                  <Form.Control
                    defaultValue={manifestName}
                    readOnly
                    style={{ cursor: "pointer", margin: "0px 0px 14px" }}
                    onClick={
                      () =>
                        window.open(manifest, "_blank") ||
                        window.location.replace(manifest) //Opens in new tab || Opens in same tab if pop ups are blocked
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
                          setFileCount(fileCount + 1);
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
                          setFileCount(fileCount - 1);
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

        <Form.Group>
          {/* //^ ------------------------- IMAGES ---------------------------- */}
          <Form.Label className="form-label">Images</Form.Label>
          <Button
            onClick={() => {
              setTempImages([...tempImages, tempImageCount]);
              setTempImageCount(tempImageCount + 1);
              setImageCount(imageCount + 1);
            }}
            className="form-button"
            block
            style={{
              width: "150px",
              backgroundColor: "#000",
              margin: "0px",
            }}
          >
            Add images
          </Button>

          {tempImages.map((item, index) => {
            if (item == index) {
              return (
                <Row key={index} className="flex-start-center" style={{ margin: "10px auto 0px" }}>
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
        </Form.Group>

        {images.map((item, index) => {
          const id = imageIds[index];
          const { image, imageName } = item;
          return (
            <>
              <Form.Row key={id}>
                <Col sm={11}>
                  <Form.Control
                    defaultValue={imageName}
                    readOnly
                    style={{ cursor: "pointer" }}
                    onClick={
                      () =>
                        window.open(image, "_blank") ||
                        window.location.replace(image) //Opens in new tab || Opens in same tab if pop ups are blocked
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
                    {oldImageIds.includes(id) ? (
                      <img
                        src={undo}
                        alt="undo"
                        onClick={() => {
                          console.log("id to be added back", id);
                          setOldImageIds(
                            oldImageIds.filter((item) => item !== id)
                          );
                          setImageCount(imageCount + 1);
                          console.log("old image id", oldImageIds);
                        }}
                      />
                    ) : (
                      <img
                        src={cancel}
                        alt="remove"
                        onClick={() => {
                          console.log("id to be deleted", id);
                          setOldImageIds([...oldImageIds, id]);
                          setImageCount(imageCount - 1);
                          console.log("old image id", oldImageIds);
                        }}
                      />
                    )}
                  </button>
                </Col>
              </Form.Row>
              {oldImageIds.includes(id) && (
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
