import React, { useEffect } from "react";
import logo from "../../img/w-logo.png";
import { Card, Accordion, Carousel, Image } from "react-bootstrap";
import { FaAngleDoubleDown } from "react-icons/fa";
import NotesForm from "./NotesForm";
import { useInventoryContext } from "../../inventory";

const TruckDetailsCard = ({ id, current }) => {
  
  const {
    sellerId,
    buyerId,
    loadId,
    category,
    commission,
    contents,
    cost,
    created,
    fob,
    lane,
    owner,
    palletCount,
    price,
    retailPrice,
    source,
    units,
    paid,
    shippingStatus,
    sold,
    status,
    accountingNotes,
    logisticsNotes,
    salesNotes,
    images,
    manifests,
    imageObjects, setImageObjects,
    manifestObjects, setManifestObjects
  } = useInventoryContext();
  return (
    <>
      <section className="truck-section">
        <h2 className="truck-details-header">{source}</h2>
        <div className="truck">
          <div className="truck-info">
            {/* <img src={logo} alt={source} style={{ size: "10rem" }} /> */}
            {imageObjects.length > 0 ? (
              <Carousel style={{ margin: "0px 0px 24px" }} interval={null}>
                {imageObjects.map((item, index) => {
                  const { name, url } = item;
                  return (
                    <Carousel.Item>
                      <Image src={url} style={{ cursor: "pointer" }} />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            ) : (
              <img src={logo} alt={source} style={{ size: "10rem" }} />
            )}
            <NotesForm id={id} />
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
                  <span className="truck-data-title">ID </span>
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
                  <span className="truck-data-title">Program </span>
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
                  <span className="truck-data-title">Price </span>
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
                  <span className="truck-data-title">Cost </span>
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
                  <span className="truck-data-title">Retail Price </span>
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
                  <span className="truck-data-title">Commission </span>
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
                  <span className="truck-data-title">Category </span>
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
                  <span className="truck-data-title">Owner </span>
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
                  <span className="truck-data-title">Units </span>
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
                  <span className="truck-data-title">Pallets </span>
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
                  <span className="truck-data-title">FOB </span>
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
                  <span className="truck-data-title">Lane </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {lane}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ SHIPPING STATUS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Shipping Status </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {`${
                      shippingStatus === 0
                        ? "Awaiting Shipment"
                        : shippingStatus === 1
                        ? "Shipped"
                        : "Delivered"
                    }`}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ PAID STATUS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Paid? </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {`${paid === false ? "No" : "Yes"}`}
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
                  <span className="truck-data-title">Status </span>
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
            {/* //^ TRUCK DETAILS ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }} className="contents-accordion">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Details </span>
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
            {/* //^ TRUCK MANIFEST ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Manifests </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ backgroundColor: "transparent" }}>
                    {manifestObjects.map((file, index) => {
                      const { name, url } = file;
                      return (
                        <ul key={index}>
                          <li
                            onClick={
                              () =>
                                window.open(url, "_blank") ||
                                window.location.replace(url) //Opens in new tab || Opens in same tab if pop ups are blocked
                            }
                          >
                            <span style={{ cursor: "pointer", color: "black" }}>
                              {name}
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
