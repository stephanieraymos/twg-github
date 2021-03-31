import React, { useState, useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaTimes,
  FaEdit,
  FaAngleDoubleDown,
} from "react-icons/fa";
import Navigation from "./Navigation";
// import { useTruck } from "../truckContext";
import { useParams, Link, useHistory } from "react-router-dom";
import Loading from "./Loading";
import logo from "../img/w-logo.png";
import { Card, Accordion } from "react-bootstrap";
import { useGlobalContext } from "../context";
import { useAuthContext } from "../auth";

const TruckDetails = () => {
  const url = "https://api.thewholesalegroup.com/v1/trucks/?id=";
  const inventoryURL = "https://api.thewholesalegroup.com/v1/trucks/";
  const manifestURL = "https://api.thewholesalegroup.com/v1/trucks/manifest/";

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState(1);
  const [contents, setContents] = useState("");
  const [manifestId, setManifestId] = useState([]);
  const [files, setFiles] = useState([]);
  const [isTruckDeleted, setIsTruckDeleted] = useState(false); // checking if truck is deleted

  const {
    accessToken: [accessToken, setAccessToken],
    authenticate,
  } = useAuthContext();

  let history = useHistory();

  document.title = "Truck Details";

  //^ GET MANIFEST REQUEST //
  const getManifest = (truckManifestId) => {
    try {
      const data = new FormData();
      truckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(manifestURL, {
        method: "POST",
        header: {
          "Authorization": "Bearer " + accessToken,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setFiles(manifest));
    } catch (error) {
      console.log(error);
    }
  };

  // *@todo update only works if the truck has a file. If the truckManifest is empty. POST fails

  const deleteTruck = (id, truckManifestId) => {
    try {
      const data = new FormData();
      data.append("id", id);
      truckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(inventoryURL, {
        method: "DELETE",
        header: {
          "Authorization": "Bearer " + accessToken,
        },
        body: data,
      }).then((response) => {
        if (response.ok) {
          setIsTruckDeleted(true);
          return;
        } else {
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTruck = () => {
    fetch(`${url}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const {
            truckName,
            truckPrice,
            truckContents,
            truckManifestId,
            company,
            status,
          } = data[0];

          if (truckManifestId.length) {
            getManifest(truckManifestId);
          }

          setName(truckName);
          setPrice(truckPrice);
          setContents(truckContents.join(", "));
          setManifestId(truckManifestId);
          setCompany(company);
          setStatus(status);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // send user back to login if they're not logged in
    authenticate(
      () => {},
      () => {
        history.push("/");
      }
    );

    setLoading(true);
    getTruck();
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }
  // if (!truck) {
  //   return <h2>No truck to display</h2>;
  // }

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="back-to-link-container">
        <FaAngleDoubleLeft />
        <Link to="/trucks" className="back-to-link">
          Back to inventory
        </Link>
      </div>

      <section className="truck-section">
        <h2 className="truck-details-header">{name}</h2>
        <div className="truck">
          <img src={logo} alt={name} style={{ size: "10rem" }} />
          <div className="truck-info">
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
                  <span className="truck-data-title">Name: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {name}
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
            {/* //^ COMPANY CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Company: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {company}
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
                  <Card.Body style={{ backgroundColor: "transparent" }}>
                    {files &&
                      files.map((manifest, index) => {
                        const { truckManifest, truckManifestName } = manifest;
                        return (
                          <ul key={manifestId[index]}>
                            <li
                              onClick={
                                () =>
                                  window.open(truckManifest, "_blank") ||
                                  window.location.replace(truckManifest) //Opens in new tab || Opens in same tab if pop ups are blocked
                              }
                            >
                              <span
                                style={{ cursor: "pointer", color: "black" }}
                              >
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
            {/* //^ TRUCK MODIFY ACCORDION */}
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
                  <Card.Body style={{ backgroundColor: "transparent" }}>
                    <p className="data-wrapper">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTruck(id, manifestId);
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

export default TruckDetails;