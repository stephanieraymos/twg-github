import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTruck } from "../truckContext";
import folder from "../img/folder.svg";
import noSign from "../img/no-sign.svg";
import { Modal } from "react-bootstrap"
import { useAuthContext } from "../auth";

const TableInventory = () => {
  let history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truckFile, setTruckFile] = useState([]);
  const keys = [];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [trucks] = useTruck();

  const {
    fetchAccessToken,
  } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
      })
      .catch((error) => {
        history.push("/");
      });
  }, []);


  //^ GET MANIFEST REQUEST //
  const getManifest = (manifestIds) => {
    try {
      const data = new FormData();
      manifestIds.map((id) => data.append("manifestIds", id));
      fetch("https://api.thewholesalegroup.com/v1/trucks/manifest/", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setTruckFile(manifest))
        .then(() => openModal());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-wrapper">
        <div className="header-items">
          <span className="all-trucks-table-header-load truck">LOAD</span>
          <span className="all-trucks-table-header-program program">PROGRAM</span>
          <span className="all-trucks-table-header-category category">
            CATEGORY
          </span>
          <span className="all-trucks-table-header-units units">
            UNITS
          </span>
          <span className="all-trucks-table-header-pallets pallets">PALLETS</span>
          <span className="all-trucks-table-header-fob fob">FOB</span>
          <span className="all-trucks-table-header-retail retail">RETAIL</span>
          <span className="all-trucks-table-header-price price">PRICE</span>
        </div>
        <div className="truckLoad-list">
          {trucks.map((truck) => {
            let {
              id,
              truckName,
              truckPrice,
              contents,
              manifestIds,
              status,
            } = truck;

            return (
              <div className="truckLoad" key={id}>
                <Link
                  to={`/TruckDetails/${id}`}
                  className="items all-trucks-load text-truncate"
                >
                  {id}
                </Link>

                <p className="items all-trucks-program text-truncate">
                  {truckName}
                </p>
                <p className="items all-trucks-category text-truncate">
                  {/* {category} */}
                </p>
                <p className="items all-trucks-units text-truncate">
                  {/* {units} */}
                </p>
                <p className="items all-trucks-pallets text-truncate">
                  {/* {pallets} */}
                </p>
                <p className="items all-trucks-fob text-truncate">
                  {/* {fob} */}
                </p>
                <p className="items all-trucks-retail text-truncate">
                  {/* {retailPrice} */}
                </p>
                <p className="items all-trucks-price text-truncate">
                  ${truckPrice}
                </p>



                <Modal
                  show={isModalOpen}
                  onHide={closeModal}
                  dialogClassName="files-modal"
                >
                  <Modal.Dialog
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Modal.Header style={{ color: "black", display: "block" }}>
                      <h1
                        style={{
                          textShadow: "0px 4px 4px rgba(164, 188, 236, 0.45)",
                        }}
                      >
                        File List
                      </h1>
                    </Modal.Header>
                    <Modal.Body
                      style={{ color: "white", borderTop: "1px black solid" }}
                    >
                      {truckFile.map((manifest) => {
                        // Map method to get list of files for each truck inside modal
                        const {
                          manifests,
                          manifestsName,
                          manifestIds,
                        } = manifest;
                        return (
                          <ul>
                            <li
                              key={manifestIds}
                              onClick={
                                () =>
                                  window.open(manifests, "_blank") ||
                                  window.location.replace(manifests) //Opens in new tab || Opens in same tab if pop ups are blocked
                              }
                            >
                              <p style={{ cursor: "pointer", color: "black" }}>
                                {manifestsName}
                              </p>
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

export default TableInventory;
