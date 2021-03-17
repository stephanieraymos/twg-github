import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { useTruckContext } from "../truckContext";
import download from "../img/download.svg";
import inventory from "../css/inventory.css";
import AddInventory from "./AddInventory";
import { Container, Modal } from "react-bootstrap";

function InventoryAllTrucks() {
  document.title = "Inventory - Database";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckFile, setTruckFile] = useState([]);

  const openModal = (truckManifest) => {
    // e.preventDefault()
    getManifest(truckManifest);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { trucks } = useTruckContext();

  //^ GET MANIFEST REQUEST //
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
    console.log("log inside getManifest: (truckManifest)", truckManifest);
    console.log("log inside getManifest: (response)",response);
    console.log("log inside getManifest: (data)",data);
    const json = await response.json();
    console.log(json);
    setTruckFile(json);
    return json;
    // const file = await json["truckManifest"];
    // console.log(file);
    // window.location.assign([file]);
    // console.log([truckManifestName])
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
                <button onClick={() => getManifest(truckManifest), openModal}>
                  <p className="items all-trucks-manifest">
                    <img src={download} alt="download icon" />
                  </p>
                </button>

                <Modal show={isModalOpen} onHide={closeModal}>
                  <Modal.Header style={{ color: "black" }}>
                    Manifests for this truck
                  </Modal.Header>
                  <Modal.Body>
                    {/*//^ Map method to get list of files for each truck inside modal */}
                    {trucks.map((manifest, index) => {
                      const { truckManifestName, truckManifest } = manifest;
                      console.log("truckManifestName", truckManifestName);

                      return (
                        <ul>
                          <li
                            key={index}
                            onClick={() => getManifest([truckManifest])}
                          >
                            {truckManifestName}
                          </li>
                        </ul>
                      );
                    })}
                  </Modal.Body>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default InventoryAllTrucks;
