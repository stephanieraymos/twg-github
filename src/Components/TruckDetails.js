import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
// import { useTruck } from "../truckContext";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading"

const url = "http://143.110.225.28/api/v1/inventory/?id=";

const TruckDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [truck, setTruck] = useState(null);

  // const {
  //   trucks,
  //   truckName,
  //   truckPrice,
  //   truckContents,
  //   truckManifest,
  //   truckId,
  // } = useTruck();
  document.title = "Truck Details";

  useEffect(() => {
    console.log("hi")
    setLoading(true);
    async function getTruck() {
      try {
        const response = await fetch(`${url}${id}`);
        console.log(`${url}${id}`)
        const data = await response.json();
        if (data) {
          const {
            truckName: truckName,
            truckPrice: truckPrice,
            truckContents: truckContents,
          } = data[0];
          // } = data;

          const truckManifest = [
            truckManifest[0],
            truckManifest[1],
            truckManifest[2],
            truckManifest[3],
            truckManifest[4],
          ];

          const newTruck = {
            truckName,
            truckPrice,
            truckContents,
            truckManifest,
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
  // },);
  if (loading) {
    return <Loading />;
  }
  if (!truck) {
    return <h2>No truck to display</h2>;
  }
  const { truckName, truckPrice, truckContents, truckManifest } = truck;

  return (
    <>

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
              {truckManifest.map((file, index) => {
                return file ? <span key={index}>{file},</span> : null;
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
