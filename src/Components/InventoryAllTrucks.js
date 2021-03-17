import React, { useState } from "react";
import Navigation from "./Navigation";
import { useTruckContext } from "../truckContext";
import download from "../img/download.svg";
import inventory from "../css/inventory.css";
import AddInventory from "./AddInventory";
import { Container, Modal } from "react-bootstrap";

function InventoryAllTrucks() {
  document.title = "Inventory - Database";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { trucks } = useTruckContext();
  const getManifest = async (truckManifest) => {
    let data = new FormData();
    data.append("truckManifestId", truckManifest);
    const response = await fetch(
      "http://143.110.225.28/api/v1/inventory/manifest/",
      {
        method: "POST",
        body: data,
      }
    );
    console.log(truckManifest);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const file = await json["truckManifest"];
    console.log(file);
    window.location.assign([file]);
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

                <button onClick={openModal}>
                  <p className="items all-trucks-manifest">
                    <img src={download} alt="download icon" />
                  </p>
                </button>

                {truckManifest.map((manifest, index) => {
                  const { truckManifestName, truckManifest } = manifest;

                  return (
                    <Modal show={isModalOpen} onHide={closeModal}>
                      <Modal.Header style={{color: "black"}}>Manifests for this truck</Modal.Header>
                      <Modal.Body>
                        <ul>
                          <li key={index} onClick={() => getManifest([truckManifest[0]])}>
                            {truckManifestName}
                          </li>
                        </ul>
                      </Modal.Body>
                    </Modal>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default InventoryAllTrucks;
