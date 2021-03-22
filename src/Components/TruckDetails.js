import React, { useState, useEffect } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Navigation from "./Navigation";
// import { useTruck } from "../truckContext";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import logo from "../img/logo-blue.svg"

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
          <img src={logo} alt={truckName} />
          <div className="truck-info">
            <p>
              <span className="truck-data">Name: </span>
              {truckName}
            </p>
            <p>
              <span className="truck-data">Price: </span>
              {truckPrice}
            </p>

            <p>
              <span className="truck-data">Contents: </span>
              {truckContents.map((truck, index) => {
                return truck ? <span key={index}>{truck},</span> : null;
              })}
            </p>

            <p>
              <span className="truck-data">Files: </span>
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
                      <p style={{ cursor: "pointer", color: "black" }}>
                        {truckManifestName}
                      </p>
                    </li>
                  </ul>
                );
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TruckDetails;

// TP-52
