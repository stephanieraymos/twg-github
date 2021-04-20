import React, { useRef } from "react";
import logo from "../../img/w-logo.png";
import {
  Card,
  Accordion,
  Carousel,
  Image,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { FaAngleDoubleDown, FaEdit } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { inventoryPATH } from "../../Pages/paths";
import { useTruckContext } from "../../truckContext";
import { useAuthContext } from "../../auth";
import { useGlobalContext } from "../../context";
import { inventoryURL } from "../../Pages/urls";

const TruckDetailsCard = ({ id, current }) => {
  const {
    isEditingLogi,
    setIsEditingLogi,
    isEditingAct,
    setIsEditingAct,
    isEditingSales,
    setIsEditingSales,
    salesReadMore,
    setSalesReadMore,
    accountingReadMore,
    setAccountingReadMore,
    logisticsReadMore,
    setLogisticsReadMore,
    setValidated,
    salesNotes,
    setSalesNotes,
    actNotes,
    setActNotes,
    logiNotes,
    setLogiNotes,
    setOriginalValues,
  } = useGlobalContext();

  const salesForm = useRef(null);
  const logiForm = useRef(null);
  const actForm = useRef(null);

  const { isSeller, isAdmin, accessToken } = useAuthContext();
  const {
    isEmpty: [isEmpty, setIsEmpty],
    loadId: [loadId, setLoadId],
    source: [source, setSource],
    retailPrice: [retailPrice, setRetailPrice],
    price: [price, setPrice],
    status: [status, setStatus],
    contents: [contents, setContents],
    category: [category, setCategory],
    units: [units, setUnits],
    palletCount: [palletCount, setPalletCount],
    fob: [fob, setFob],
    manifestIds: [manifestIds, setManifestIds],
    files: [files, setFiles],
    owner: [owner, setOwner],
    cost: [cost, setCost],
    commission: [commission, setCommission],
    sales: [sales, setSales],
    accounting: [accounting, setAccounting],
    logistics: [logistics, setLogistics],
    lane: [lane, setLane],
    fileCount: [fileCount, setFileCount],
    imageCount,
    setImageCount,
    imageIds,
    setImageIds,
    images,
    setImages,
  } = useTruckContext();

  // Return true or false to indicate if fetch was successful
  const updateSalesNotes = () => {
    const data = new FormData(salesForm.current);
    data.append("id", id);

    fetch(inventoryURL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return true;
        } else return false;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelLogi = () => {
    setIsEditingLogi(false);
  };
  const cancelAct = () => {
    setIsEditingAct(false);
  };
  const cancelSales = () => {
    setIsEditingSales(false);
  };

  const handleSalesSubmit = (event) => {
    const salesForm = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (salesForm.checkValidity() === true) {
      setValidated(false);
      performSalesNotesUpdate();
    } else {
      setValidated(true);
    }
  };
  const handleActSubmit = (event) => {
    const actForm = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (actForm.checkValidity() === true) {
      setValidated(false);
      performActNotesUpdate();
    } else {
      setValidated(true);
    }
  };
  const handleLogiSubmit = (event) => {
    const logiForm = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (logiForm.checkValidity() === true) {
      setValidated(false);
      performLogiNotesUpdate();
    } else {
      setValidated(true);
    }
  };

  const performSalesNotesUpdate = () => {
    const data = new FormData(salesForm.current);
    var object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    setSalesNotes(object)
      .then((salesNotes) => {
        setIsEditingSales(false);
        setSalesNotes((prevState) => ({
          ...prevState,
          [id]: object,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const performActNotesUpdate = () => {
    const data = new FormData(actForm.current);
    var object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    setActNotes(object)
      .then((actNotes) => {
        setIsEditingAct(false);
        setActNotes((prevState) => ({
          ...prevState,
          [id]: object,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const performLogiNotesUpdate = () => {
    const data = new FormData(logiForm.current);
    var object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    setLogiNotes(object)
      .then((logiNotes) => {
        setIsEditingLogi(false);
        setLogiNotes((prevState) => ({
          ...prevState,
          [id]: object,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="truck-section">
        <h2 className="truck-details-header">{source}</h2>
        <div className="truck">
          <div className="truck-info">
            {/* <img src={logo} alt={source} style={{ size: "10rem" }} /> */}
            {images.length > 0 ? (
              <Carousel style={{ margin: "0px 0px 24px" }} interval={null}>
                {images.map((item, index) => {
                  const { image, imageName } = item;
                  return (
                    <Carousel.Item>
                      <Image src={image} style={{ cursor: "pointer" }} />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            ) : (
              <img src={logo} alt={source} style={{ size: "10rem" }} />
            )}
            {(isSeller() || isAdmin()) && (
              <>
                {/* //^ SALES NOTES */}
                <Form ref={salesForm} style={{ border: "none" }}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="truck-data-title">
                      Sales Notes:
                    </Form.Label>
                    <Col sm={8}>
                      <button
                        key={isEditingSales ? "button-submit" : "button-edit"}
                        type={isEditingSales ? "submit" : "button"}
                        onClick={
                          isEditingSales ? null : () => setIsEditingSales(true)
                        }
                        className="edit-notes-btn edit-notes-header-btn"
                      >
                        {isEditingSales ? (
                          "Update"
                        ) : (
                          <>
                            <FaEdit /> <span>Edit Notes</span>
                          </>
                        )}
                      </button>
                      {isEditingSales && (
                        <button
                          type="button"
                          onClick={
                            isEditingSales
                              ? () => cancelSales()
                              : (e) => {
                                  e.preventDefault();
                                }
                          }
                          className="cancel-update-notes"
                        >
                          Cancel
                        </button>
                      )}

                      {isEditingSales ? (
                        <Form.Control
                          type="salesNotes"
                          required
                          value={salesNotes}
                          onChange={(e) => setSalesNotes(e.target.value)}
                          name="saleNotes"
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          required
                          readOnly
                          value={salesNotes}
                          onChange={(e) => setSalesNotes(e.target.value)}
                          name="salesNotes"
                        />
                      )}
                    </Col>
                  </Form.Group>

                  {/* //^ EDIT NOTES LINKS */}

                  {sales.length < 115 && sales.length !== 0 ? (
                    `${sales}`
                  ) : sales.length > 115 ? (
                    <span>
                      {salesReadMore ? sales : `${sales.substring(0, 115)}...`}
                      <button
                        className="show-more-btn"
                        onClick={() => {
                          setSalesReadMore(!salesReadMore);
                        }}
                      >
                        {salesReadMore ? "show less" : "read more"}
                      </button>
                    </span>
                  ) : (
                    <p>No Notes yet</p>
                  )}
                </Form>
                {/* //^ ACCOUNTING NOTES */}

                <Form
                  ref={actForm}
                  style={{ border: "none" }}
                  handleSubmit={handleActSubmit}
                >
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="truck-data-title">
                      Accounting Notes:
                    </Form.Label>
                    <Col sm={8}>
                      <button
                        key={isEditingAct ? "button-submit" : "button-edit"}
                        type={isEditingAct ? "submit" : "button"}
                        onClick={
                          isEditingAct ? null : () => setIsEditingAct(true)
                        }
                        className="edit-notes-btn edit-notes-header-btn"
                      >
                        {isEditingAct ? (
                          "Update"
                        ) : (
                          <>
                            <FaEdit /> <span>Edit Notes</span>
                          </>
                        )}
                      </button>

                      {isEditingAct && (
                        <button
                          type="button"
                          onClick={
                            isEditingAct
                              ? () => cancelAct()
                              : (e) => {
                                  e.preventDefault();
                                }
                          }
                          className="cancel-update-notes"
                        >
                          Cancel
                        </button>
                      )}

                      {isEditingAct ? (
                        <Form.Control
                          required
                          value={actNotes}
                          onChange={(e) => setActNotes(e.target.value)}
                          name="actNotes"
                        />
                      ) : (
                        <Form.Control
                          required
                          readOnly
                          value={actNotes}
                          onChange={(e) => setActNotes(e.target.value)}
                          name="actNotes"
                        />
                      )}
                    </Col>
                  </Form.Group>
                  <div
                    style={{ color: "black", backgroundColor: "transparent" }}
                  >
                    {accounting.length < 115 && accounting.length !== 0 ? (
                      `${accounting}`
                    ) : accounting.length > 115 ? (
                      <span>
                        {accountingReadMore
                          ? accounting
                          : `${accounting.substring(0, 115)}...`}
                        <button
                          className="show-more-btn"
                          onClick={() => {
                            setAccountingReadMore(!accountingReadMore);
                          }}
                        >
                          {accountingReadMore ? "show less" : "read more"}
                        </button>
                      </span>
                    ) : (
                      <p>No Notes yet</p>
                    )}
                  </div>
                </Form>
                {/* //^ LOGISTICS NOTES */}
                <Form
                  style={{ border: "none" }}
                  onSubmit={handleLogiSubmit}
                  ref={logiForm}
                >
                  <Form.Group as={Row}>
                    <Form.Label column sm={4} className="truck-data-title">
                      Logistics Notes:
                    </Form.Label>
                    <Col sm={8}>
                      <button
                        key={isEditingLogi ? "button-submit" : "button-edit"}
                        type={isEditingLogi ? "submit" : "button"}
                        onClick={
                          isEditingLogi ? null : () => setIsEditingLogi(true)
                        }
                        className="edit-notes-btn edit-notes-header-btn"
                      >
                        {isEditingLogi ? (
                          "Update"
                        ) : (
                          <>
                            <FaEdit /> <span>Edit Notes</span>
                          </>
                        )}
                      </button>

                      {isEditingLogi && (
                        <button
                          type="button"
                          onClick={
                            isEditingLogi
                              ? () => cancelAct()
                              : (e) => {
                                  e.preventDefault();
                                }
                          }
                          className="cancel-update-notes"
                        >
                          Cancel
                        </button>
                      )}

                      {isEditingLogi ? (
                        <Form.Control
                          required
                          value={logiNotes}
                          onChange={(e) => setLogiNotes(e.target.value)}
                          name="logiNotes"
                        />
                      ) : (
                        <Form.Control
                          required
                          readOnly
                          value={
                            logiNotes.length < 115 && logiNotes.length !== 0 ? (
                              `${logiNotes}`
                            ) : logiNotes.length > 115 ? (
                              <span>
                                {logisticsReadMore
                                  ? logiNotes
                                  : `${logiNotes.substring(0, 115)}...`}
                                <button
                                  className="show-more-btn"
                                  onClick={() => {
                                    setLogisticsReadMore(!logisticsReadMore);
                                  }}
                                >
                                  {logisticsReadMore
                                    ? "show less"
                                    : "read more"}
                                </button>
                              </span>
                            ) : (
                              <span>No Notes</span>
                            )
                          }
                          onChange={(e) => setLogiNotes(e.target.value)}
                          name="logiNotes"
                        />
                      )}
                    </Col>
                  </Form.Group>

                  <div
                    style={{ color: "black", backgroundColor: "transparent" }}
                  ></div>
                </Form>
              </>
            )}
          </div>

          <div className="truck-info">
            {/* //^ TRUCK ID CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">ID: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {loadId}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ TRUCK NAME CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Program: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {source}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ TRUCK PRICE CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Price: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    ${price}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ OUR COST CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Cost: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    ${cost}
                  </span>
                </p>
              </Card.Header>
            </Card>

            {/* //^ TRUCK RETAIL PRICE CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Retail Price: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    ${retailPrice}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ COMMISSION CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Commission: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {commission}%
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ CATEGORY CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Category: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {category}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ OWNER CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Owner: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {owner}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ UNITS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Units: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {units}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ PALLETS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Pallets: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {palletCount}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ FOB CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">FOB: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {fob}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ LANE CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Lane: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {lane}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ STATUS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Status: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {`${
                      status === 0
                        ? "sold"
                        : status === 1
                        ? "pending"
                        : "available"
                    }`}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ TRUCK CONTENTS ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Contents: </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body
                    style={{ color: "black", backgroundColor: "transparent" }}
                  >
                    <span>{contents}</span>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* //^ TRUCK FILES ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }} className="file-accordion">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Files: </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ backgroundColor: "transparent" }}>
                    {files.map((file, index) => {
                      const { manifest, manifestName } = file;
                      return (
                        <ul key={manifestIds[index]}>
                          <li
                            onClick={
                              () =>
                                window.open(manifest, "_blank") ||
                                window.location.replace(manifest) //Opens in new tab || Opens in same tab if pop ups are blocked
                            }
                          >
                            <span style={{ cursor: "pointer", color: "black" }}>
                              {manifestName}
                            </span>
                          </li>
                        </ul>
                      );
                    })}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default TruckDetailsCard;
