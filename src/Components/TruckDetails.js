import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
// import { useTruck } from "../truckContext";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading"

const url = "http://143.110.225.28/api/v1/inventory/?id=";
const inventoryURL = "http://143.110.225.28/api/v1/inventory/";

const TruckDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [truck, setTruck] = useState(null);
  const [truckFile, setTruckFile] = useState([]);
  const [newTruckManifest, setNewTruckManifest] = useState(null);         // files to be added
  const [oldTruckManifestId, setOldTruckManifestId] = useState(null);     // files to be deleted

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
        .then((manifest) => setTruckFile(manifest))
    } catch (error) {
      console.log(error);
    }
  };

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    try {
      const data = new FormData();
      data.append("id", id)
      data.append("truckName", id)
      data.append("truckPrice", id)
      truckContents.map((data) => data.append("truckContents", data));
      newTruckManifest.map((id) => data.append("truckManifest", id));
      oldTruckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(inventoryURL, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok)
            return true
          else
            return false
        })
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTruck = () => {
    try {
      const data = new FormData();
      data.append("id", id)
      truckManifestId.map((id) => data.append("truckManifestId", id));
      fetch(inventoryURL, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok)
            return true
          else
            return false
        })
    } catch (error) {
      console.log(error);
    }
  }

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
            truckManifestId: truckManifestId
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

      <section>
        <Link to="/InventoryAllTrucks" className="boot-button">
          Back to inventory
        </Link>
        <h2>{truckName}</h2>
        <div>
          <div>
            <p>
              <span>Name: </span>
              {truckName}
            </p>
            <p>
              <span>Price: </span>
              {truckPrice}
            </p>

            <p>
              <span>Contents: </span>
              {truckContents.map((truck, index) => {
                return truck ? <span key={index}>{truck},</span> : null;
              })}
            </p>

            <p>
              <span>Files: </span>
              {truckFile.map((manifest, index) => {
                const {
                  truckManifest,
                  truckManifestName
                } = manifest;

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

      {/* <h1>Truck Details</h1>
      {trucks.map((truck) => {
        return (
          <>
            <div>
              <h3>{truckName}</h3>
              <p>{truckPrice}</p>
              <p>{truckContents}</p>
              <p>{truckManifest}</p>
              <p>{truckId}</p>
            </div>
          </>
        );
      })} */}
    </>
  );
};

export default TruckDetails;

// TP-52
