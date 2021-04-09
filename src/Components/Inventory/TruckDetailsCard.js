import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/w-logo.png";
import { Card, Accordion } from "react-bootstrap";
import { FaTimes, FaEdit, FaAngleDoubleDown } from "react-icons/fa";

const TruckDetailsCard = ({
  source,
  loadId,
  price,
  cost,
  retailPrice,
  category,
  units,
  palletCount,
  fob,
  contents,
  files,
  manifestIds,
  id,
  deleteTruck,
  status,
  owner,
  commission,
}) => {
  return (
    <>
      <section className="truck-section">
        <h2 className="truck-details-header">{source}</h2>
        <div className="truck">
          <img src={logo} alt={source} style={{ size: "10rem" }} />
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
                    {price}
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
                    {cost}
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
                    {retailPrice}
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
                  <span className="truck-data-title">status: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {status ? "Available" : "Sold"}
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
                    {files.map((manifest, index) => {
                      const { manifests, manifestName } = manifest;
                      return (
                        <ul key={manifestIds[index]}>
                          <li
                            onClick={
                              () =>
                                window.open(manifests, "_blank") ||
                                window.location.replace(manifests) //Opens in new tab || Opens in same tab if pop ups are blocked
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
            {/* //^ TRUCK MODIFY ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Modify </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ backgroundColor: "transparent" }}>
                    <p className="data-wrapper">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTruck();
                        }}
                        className="delete-truck-btn"
                      >
                        <FaTimes /> Delete this truck
                      </button>
                      <Link
                        className="edit-truck-btn"
                        to={`/UpdateTruckDetails/${id}`}
                      >
                        <FaEdit /> Edit this truck
                      </Link>
                    </p>
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
