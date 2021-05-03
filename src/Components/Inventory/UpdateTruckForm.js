import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import cancel from "../../img/cancel.svg";
import undo from "../../img/undo.svg";

import { useInventoryContext } from "../../inventory";

const UpdateTruckForm = ({
  form,
  validated,
  handleSubmit,
  deletedImages,
  setDeletedImages,
  deletedManifests,
  setDeletedManifests,
  redirect,
}) => {
  const [manifestsCount, setManifestsCount] = useState(0);
  const [tempImages, setTempImages] = useState([]);
  const [tempImageCount, setTempImageCount] = useState(0);

  const {
    id, setId,
    sellerId, setSellerId,
    buyerId, setBuyerId,
    loadId, setLoadId,
    category, setCategory,
    commission, setCommission,
    contents, setContents,
    cost, setCost,
    created, setCreated,
    fob, setFob,
    lane, setLane,
    owner, setOwner,
    palletCount, setPalletCount,
    price, setPrice,
    retailPrice, setRetailPrice,
    source, setSource,
    units, setUnits,
    paid, setPaid,
    shippingStatus, setShippingStatus,
    sold, setSold,
    status, setStatus,
    images, setImages,
    manifests, setManifests,
    imageObjects, setImageObjects,
    manifestObjects, setManifestObjects
  } = useInventoryContext();

  const removeImage = (index) => {
    const list = [...tempImages];
    list[index] = -1;
    setTempImages(list);
  };
  console.log(paid, shippingStatus)

  useEffect(() => {
    console.log('imageObjects', imageObjects);
    console.log('manifestObjects', manifestObjects);
  }, [])

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
                name="retail_price"
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

        {/* //^ ----------DETAILS---------- */}
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">Details</Form.Label>
          <Form.Control
            type="text"
            defaultValue={contents}
            name="contents"
            onChange={(e) => setContents(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please add details about this load.
          </Form.Control.Feedback>
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
                name="pallet_count"
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
            {/* //^ ----------SHIPPING STATUS---------- */}
            <Col>
              <Form.Label className="form-label">Shipping Status</Form.Label>

              <Form.Control
                as="select"
                required
                name="shippingStatus"
                custom
                placeholder={shippingStatus}
                onChange={(e) => {
                  setShippingStatus(e.target.value);
                }}
                value={shippingStatus}
              >
                <option value="" disabled hidden>
                  {shippingStatus === 0
                    ? "Awaiting Shipment"
                    : shippingStatus === 1
                    ? "Shipped"
                    : "Delivered"}
                </option>
                <option value="2">Delivered</option>
                <option value="1">Shipped</option>
                <option value="0">Awaiting Shipment</option>
              </Form.Control>
            </Col>
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
          </Row>
          <Row>
            {/* //^ ----------PAID---------- */}
            <Col>
              <Form.Label className="form-label">Paid</Form.Label>

              <Form.Control
                as="select"
                required
                name="paid"
                custom
                placeholder={paid}
                onChange={(e) => {
                  setPaid(e.target.value);
                }}
                value={paid}
              >
                <option value="" disabled hidden>
                  {paid === false ? "No" : "Yes"}
                </option>
                <option value="0">No</option>
                <option value="1">Yes</option>
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

        {manifestObjects.map((file, index) => {
          const { name, url } = file;
          return (
            <>
              <Form.Row key={index}>
                <Col sm={11}>
                  <Form.Control
                    defaultValue={name}
                    readOnly
                    style={{ cursor: "pointer", margin: "0px 0px 14px" }}
                    onClick={
                      () =>
                        window.open(url, "_blank") ||
                        window.location.replace(url) //Opens in new tab || Opens in same tab if pop ups are blocked
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
                    {deletedManifests.includes(manifests[index]) ? (
                      <img
                        src={undo}
                        alt="undo"
                        onClick={() => {
                          console.log("file to be added back", manifests[index]);
                          setDeletedManifests(
                            deletedManifests.filter((item) => item !== manifests[index])
                          );
                          console.log("old manifest", deletedManifests);
                        }}
                      />
                    ) : (
                      <img
                        src={cancel}
                        alt="remove"
                        onClick={() => {
                          console.log("file to be deleted", manifests[index]);
                          setDeletedManifests([...deletedManifests, manifests[index]]);
                          console.log("old manifest", deletedManifests);
                        }}
                      />
                    )}
                  </button>
                </Col>
              </Form.Row>
              {deletedManifests.includes(manifests[index]) && (
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
        </Form.Group>

        {imageObjects.map((file, index) => {
          const { name, url } = file;
          return (
            <>
              <Form.Row key={index}>
                <Col sm={11}>
                  <Form.Control
                    defaultValue={name}
                    readOnly
                    style={{ cursor: "pointer" }}
                    onClick={
                      () =>
                        window.open(url, "_blank") ||
                        window.location.replace(url) //Opens in new tab || Opens in same tab if pop ups are blocked
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
                    {deletedImages.includes(images[index]) ? (
                      <img
                        src={undo}
                        alt="undo"
                        onClick={() => {
                          console.log("image to be added back", images[index]);
                          setDeletedImages(
                            deletedImages.filter((item) => item !== images[index])
                          );
                          console.log("old image", deletedImages);
                        }}
                      />
                    ) : (
                      <img
                        src={cancel}
                        alt="remove"
                        onClick={() => {
                          console.log("image to be deleted", images[index]);
                          setDeletedImages([...deletedImages, images[index]]);
                          console.log("old image", deletedImages);
                        }}
                      />
                    )}
                  </button>
                </Col>
              </Form.Row>
              {deletedImages.includes(images[index]) && (
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
