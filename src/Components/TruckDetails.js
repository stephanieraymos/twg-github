import React, { useState, useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaTimes,
  FaEdit,
  FaAngleDoubleDown,
} from "react-icons/fa";
import Navigation from "./Navigation";
// import { useTruck } from "../truckContext";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import logo from "../img/w-logo.png";
import { Card, Accordion } from "react-bootstrap";

const url = "http://143.110.225.28/api/v1/inventory/?id=";

const TruckDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [truck, setTruck] = useState(null);
  const [truckFile, setTruckFile] = useState([]);

  // const {
  //   trucks,
  //   truckName,
  //   truckPrice,
  //   truckContents,
  //   truckManifest,
  //   truckId,
  // } = useTruck();
  document.title = "Truck Details";

  //^ GET MANIFEST REQUEST //
  const getManifest = (truckManifestId) => {
    try {
      const data = new FormData();
      truckManifestId.map((id) => data.append("truckManifestId", id));
      fetch("http://143.110.225.28/api/v1/inventory/manifest/", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setTruckFile(manifest));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function getTruck() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data) {
          const {
            truckName: truckName,
            truckPrice: truckPrice,
            truckContents: truckContents,
            truckManifestId: truckManifestId,
          } = data[0];

          getManifest(truckManifestId);

          const newTruck = {
            truckName,
            truckPrice,
            truckContents,
            truckManifestId,
          };
          setTruck(newTruck);
        } else {
          setTruck(null);
        }
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getTruck();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!truck) {
    return <h2>No truck to display</h2>;
  }
  const { truckName, truckPrice, truckContents, truckManifestId } = truck;

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="back-to-link-container">
        <FaAngleDoubleLeft />
        <Link to="/InventoryAllTrucks" className="back-to-link">
          Back to inventory
        </Link>
      </div>

      <section className="truck-section">
        <h2 className="truck-details-header">{truckName}</h2>
        <div className="truck">
          <img src={logo} alt={truckName} style={{size: "10rem"}} />
          <div className="truck-info">
            //^ TRUCK NAME CARD
            <Card style={{ border: "none"}}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Name: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {truckName}
                  </span>
                </p>
              </Card.Header>
            </Card>
            //^ TRUCK PRICE CARD
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
                    {truckPrice}
                  </span>
                </p>
              </Card.Header>
            </Card>
            //^ TRUCK CONTENTS ACCORDION
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{
                    padding: 0,
                    borderBottom: "none",
                    borderRadius: ".4rem",
                  }}
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Contents: </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ color: "black" }}>
                    {truckContents.map((truck, index) => {
                      return truck ? <span key={index}>{truck},</span> : null;
                    })}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            //^ TRUCK FILES ACCORDION
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{
                    padding: 0,
                    borderBottom: "none",
                    borderRadius: ".4rem",
                  }}
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Files: </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {truckFile.map((manifest, index) => {
                      const { truckManifest, truckManifestName } = manifest;
                      return (
                        <ul>
                          <li
                            key={truckManifestId[index]}
                            onClick={
                              () =>
                                window.open(truckManifest, "_blank") ||
                                window.location.replace(truckManifest) //Opens in new tab || Opens in same tab if pop ups are blocked
                            }
                          >
                            <span style={{ cursor: "pointer", color: "black" }}>
                              {truckManifestName}
                            </span>
                          </li>
                        </ul>
                      );
                    })}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            //^ TRUCK MODIFY ACCORDION
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{
                    padding: 0,
                    borderBottom: "none",
                    borderRadius: ".4rem",
                  }}
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Modify </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p className="data-wrapper">
                      <button className="delete-truck-btn">
                        <FaTimes /> Delete this truck
                      </button>
                      <button className="edit-truck-btn">
                        <FaEdit /> Edit this truck
                      </button>
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

export default TruckDetails;

// TP-52
