import React from "react";
import Navigation from "./Navigation";
import { useTruck } from "../truckContext";

const TruckDetails = () => {
  const {
    trucks,
    truckName,
    truckPrice,
    truckContents,
    truckManifest,
    truckId,
  } = useTruck();
  document.title = "Item Details";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1>Truck Details</h1>
      {trucks.map((truck) => {
        return(
          <>
          <div>
            <h3>{truckName}</h3>
            <p>{truckPrice}</p>
            <p>{truckContents}</p>
            <p>{truckManifest}</p>
            <p>{truckId}</p>
          </div>
          </>
        )
      })}
    </>
  );
};

export default TruckDetails;

// TP-52
