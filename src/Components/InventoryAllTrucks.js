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
  const [truckFile, setTruckFile] = useState([]);

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
        .then((_) => openModal());

      // console.log("log inside getManifest: (truckManifest)", truckManifestId);
      // console.log("log inside getManifest: (response)", response);
      // const json = await response.json();
      // // console.log("log inside getManifest: (data)", data);
      // console.log(json);
      // return json;
      // const file = await json["truckManifest"];
      // console.log(file);
      // window.location.assign([file]);
      // console.log([truckManifestName])
    } catch (error) {
      console.log(error);
    }
  };
  // }, []);

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
                <button
                  onClick={() => {
                    getManifest(truckManifestId);
                  }}
                >
                  {/* <button onClick={openModal}> */}
                  <p className="items all-trucks-manifest">
                    <img src={download} alt="download icon" />
                  </p>
                </button>

                <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Dialog dialogAs= "inventory-modal" style={{backgroundColor: "white", flexDirection: "column" }}>
                  <Modal.Header style={{ color: "black" }}>
                    <h1 style={{textShadow: "0px 4px 4px rgba(164, 188, 236, 0.45)"}}>Manifest List</h1>
                  </Modal.Header>
                  <Modal.Body style={{  color: "white", borderTop: "1px black solid"}}>
                    {/*//^ Map method to get list of files for each truck inside modal */}
                    {truckFile.map((manifest) => {
                      const { truckManifest, truckManifestName } = manifest;
                      return (
                        <ul>
                          <li
                            key={truckManifestName}
                            onClick={() =>
                              window.open(truckManifest, "_blank") || window.location.replace(truckManifest) //Opens in new tab || Opens in same tab if pop ups are blocked
                            }
                          >
                            <p style={{cursor: "pointer"}}>{truckManifestName}</p>
                          </li>
                        </ul>
                      );
                    })}
                  </Modal.Body>
                  </Modal.Dialog>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default InventoryAllTrucks;
