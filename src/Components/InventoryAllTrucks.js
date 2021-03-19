import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { useTruckContext } from "../truckContext";
import download from "../img/download.svg";
import inventory from "../css/inventory.css";
import AddInventory from "./AddInventory";
import { Container, Modal } from "react-bootstrap";

const InventoryAllTrucks = () => {
  document.title = "Inventory - Database";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckFile, setTruckFile] = useState({});

  const openModal = () => {
    // e.preventDefault()
    //getManifest(truckManifest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { trucks } = useTruckContext();

  //^ GET MANIFEST REQUEST //
  // useEffect(() => {
    const getManifest = async (truckManifestId) => {
      try {
        const data = new FormData();
        truckManifestId.map(id => data.append("truckManifestId", id))
        const response = await fetch(
          "http://143.110.225.28/api/v1/inventory/manifest/",
          {
            method: "POST",
            body: data,
          }
        );

        console.log("log inside getManifest: (truckManifest)", truckManifestId);
        console.log("log inside getManifest: (response)", response);
        const json = await response.json();
        // console.log("log inside getManifest: (data)", data);
        console.log(json);
        return json;
        // const file = await json["truckManifest"];
        // console.log(file);
        // window.location.assign([file]);
        // console.log([truckManifestName])
      } catch (error) {
        console.log(error);
      }
    };
  // }, []);

  const populateManifest = (truckManifestId) => {
    console.log("Populate manifest")
    getManifest(truckManifestId);
    openModal()
  }

  const InventoryModal = () => {
    console.log("Inventory", truckFile)
    return Object.keys(truckFile).map((key, index) => {
      console.log("Inventory Key", key)
      console.log("Inventory Value", truckFile[key])
      return (<Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header style={{ color: "white" }}>
          Manifests for this truck
        </Modal.Header>
        <Modal.Body>
          {/*//^ Map method to get list of files for each truck inside modal */}
          {truckFile[key].map((manifest) => {
            const { truckManifest, truckManifestName } = manifest;
            console.log("Truck", truckManifest)
            // console.log("truckManifestName", truckManifestName);
            return (
              <ul>
                <li
                  key={truckManifestName}
                  onClick={() => window.location.assign(truckManifest)}
                >
                  {truckManifestName}
                </li>
              </ul>
            );
          })}
        </Modal.Body>
      </Modal>
      )
    });
  }

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
            let {
              id,
              truckName,
              truckPrice,
              truckContents,
              truckManifestId,
            } = truck;

            return (
              <div className="truckLoad" key={id}>
                <p className="items all-trucks-name">{truckName}</p>
                <p className="items all-trucks-price">${truckPrice}</p>
                <p className="items all-trucks-contents">{truckContents}</p>
                <button onClick={async () => {
                  console.log("Populate manifest")
                  getManifest(truckManifestId)
                    .then(response => {
                      setTruckFile({})
                      truckFile[truckManifestId] = response
                      setTruckFile(truckFile)
                    })
                    .then(_ => {
                      console.log("truckManifest", truckFile)
                      setIsModalOpen(true);
                    })
                }}>
                  {/* <button onClick={openModal}> */}
                  <p className="items all-trucks-manifest">
                    <img src={download} alt="download icon" />
                  </p>
                </button>

                {
                  InventoryModal()
                }


              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default InventoryAllTrucks;
