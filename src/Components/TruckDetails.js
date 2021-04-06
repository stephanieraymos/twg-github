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
  const url = "https://api.thewholesalegroup.com/v1/inventory/?id=";
  const inventoryURL = "https://api.thewholesalegroup.com/v1/inventory/edit/";
  const manifestURL = "https://api.thewholesalegroup.com/v1/inventory/manifest/";

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadId, setLoadId] = useState(""); 
  const [source, setSource] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("")
  const [units, setUnits] = useState("");
  const [palletCount, setPalletCount] = useState("");
  const [fob, setFob] = useState("");
  const [manifestId, setManifestId] = useState([]);
  const [files, setFiles] = useState([]);

  const {
    fetchAccessToken,
  } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  let history = useHistory();

  document.title = "Truck Details";

  //^ GET MANIFEST REQUEST //
  const getManifest = () => {
    if (manifestId.length > 0) {
      const data = new FormData();
      manifestId.map((id) => data.append("manifestIds", id));
      fetch(manifestURL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setFiles(manifest))
        .catch((error) => {console.log(error)});
    }
    
  };

  // *@todo update only works if the truck has a file. If the manifests is empty. POST fails

  const deleteTruck = () => {
    const data = new FormData();
    data.append("id", id);
    manifestId.map((id) => data.append("manifestIds", id));
    fetch(inventoryURL, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: data,
    })
      .then((response) => {
        history.push("/trucks");
      });
  };

  const getTruck = () => {
    fetch(`${url}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const {
            loadId,
            source,
            price,
            retailPrice,
            category,
            fob,
            units,
            palletCount,
            contents,
            manifestIds,
            company,
            status,
          } = data[0];

        setLoadId(loadId);
        setSource(source);
        setPrice(price);
        setRetailPrice(retailPrice);
        setContents(contents.join(', '));
        setManifestId(manifestIds);
        setCategory(category);
        setUnits(units);
        setPalletCount(palletCount);
        setFob(fob);
        setStatus(status);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
        getTruck();
      })
      .catch((error) => {
        history.push("/");
      });

    setLoading(true);
  }, []);

  useEffect(() => {
    getManifest();
  }, [manifestId]);

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
                    {files.map((manifest, index) => {
                      const { manifests, manifestsName } = manifest;
                      return (
                        <ul key={manifestId[index]}>
                          <li
                            onClick={
                              () =>
                                window.open(manifests, "_blank") ||
                                window.location.replace(manifests) //Opens in new tab || Opens in same tab if pop ups are blocked
                            }
                          >
                            <span style={{ cursor: "pointer", color: "black" }}>
                              {manifestsName}
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

export default TruckDetails;