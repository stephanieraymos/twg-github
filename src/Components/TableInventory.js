import React, {useState, useEffect} from "react";
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

  const [trucks, addTruck, loading, errorMessage] = useTruck();

  const {
    accessToken: [accessToken, setAccessToken],
    refreshToken: [refreshToken, setRefreshToken],
    authenticate,
  } = useAuthContext();

  useEffect(() => {
    // send user back to login if they're not logged in
    authenticate(
      () => {},
      () => {
        history.push("/");
      }
    );
  }, []);


  //^ GET MANIFEST REQUEST //
  const getManifest = (truckManifestId) => {
    try {
      const data = new FormData();
      truckManifestId.map((id) => data.append("truckManifestId", id));
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
          <span className="all-trucks-table-header-name truck">TRUCK NAME</span>
          <span className="all-trucks-table-header-price price">PRICE</span>
          <span className="all-trucks-table-header-contents contents">
            CONTENTS
          </span>
          <span className="all-trucks-table-header-manifest manifest">
            FILES
          </span>
          <span className="all-trucks-table-header-status status">STATUS</span>
        </div>
        <div className="truckLoad-list">
          {trucks.map((truck) => {
            let {
              id,
              truckName,
              truckPrice,
              truckContents,
              truckManifestId,
              status,
            } = truck;

            return (
              <div className="truckLoad" key={id}>
                <Link
                  to={`/TruckDetails/${id}`}
                  className="items all-trucks-name text-truncate"
                >
                  {truckName}
                </Link>

                <p className="items all-trucks-price text-truncate">
                  ${truckPrice}
                </p>
                <p className="items all-trucks-contents text-truncate">
                  {truckContents}
                </p>

                {(truckManifestId.length && (
                  <button
                    className="folder-icon"
                    onClick={() => {
                      getManifest(truckManifestId);
                    }}
                  >
                    <p className="items all-trucks-manifest">
                      <img src={folder} alt="download icon" />
                    </p>
                  </button>
                )) || (
                  <p
                    className="items"
                    onClick={() => alert("This truck has no files")}
                  >
                    <img
                      className="no-icon"
                      src={noSign}
                      alt="No file for this truck"
                    />
                  </p>
                )}
                <span className="items all-trucks-status text-truncate">
                  {status >= 1 ? (
                    <p className="available-status">Available</p>
                  ) : (
                    <p className="not-available-status">Not Available</p>
                  )}
                </span>
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
                          truckManifest,
                          truckManifestName,
                          truckManifestId,
                        } = manifest;
                        return (
                          <ul>
                            <li
                              key={truckManifestId}
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
