import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { useGlobalContext } from "./context";
import inventory from "../css/inventory.css";

function Inventory() {
  document.title = "Add Inventory";
  const { trucks } = useGlobalContext();


  console.log(trucks);

  return (
    <>
      <div>
        <Navigation />
      </div>
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
                <a href={truckManifest} target="_blank">
                  <p className="items all-trucks-manifest">MANIFEST</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Inventory;
