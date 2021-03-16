import React, { useContext } from "react";
import Navigation from "./Navigation";
import { useTruckContext } from "../truckContext";
import download from "../img/download.svg";
import inventory from "../css/inventory.css";
import AddInventory from "./AddInventory";
import { Container } from "react-bootstrap";
function InventoryAllTrucks() {
  document.title = "Inventory - Database";
  const { trucks } = useTruckContext();
  const getManifest = async (truckManifest) => {
    const response = await fetch(
      "http://143.110.225.28/api/v1/inventory/manifest/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          truckManifestId: truckManifest[0],
        }),
      }
    );
    const json = await response.json();
    const file = await json["truckManifest"];
    window.location.href = file;
  };

  return (
    <>
      <div>
        <Navigation />
      </div>
      <Container fluid>
        <AddInventory />
      </Container>
      <div className="table-wrapper">
        <div className="header-items">
          <p className="all-trucks-table-header-name truck">TRUCK NAME</p>
          <p className="all-trucks-table-header-price price">PRICE</p>
          <p className="all-trucks-table-header-contents contents">CONTENTS</p>
          <p className="all-trucks-table-header-manifest manifest">MANIFEST</p>
        </div>
        <div className="truckLoad-list">
          {trucks.map((truck) => {
            const {
              id,
              truckName,
              truckPrice,
              truckContents,
              truckManifest,
            } = truck;
            return (
              <div className="truckLoad" key={id}>
                <p className="items all-trucks-name">{truckName}</p>
                <p className="items all-trucks-price">${truckPrice}</p>
                <p className="items all-trucks-contents">{truckContents}</p>
                <button onClick={() => getManifest(truckManifest)}>
                  <p className="items all-trucks-manifest">
                    <img src={download} alt="download icon" />
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default InventoryAllTrucks;
