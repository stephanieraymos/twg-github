import React, { useState } from "react";
import logo from "../../img/w-logo.png";
import { Card, Accordion, Carousel, Image } from "react-bootstrap";
import { FaAngleDoubleDown, FaEdit } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { inventoryPATH } from "../../Pages/paths";
import { useTruckContext } from "../../truckContext";
import { useAuthContext } from "../../auth";

const TruckDetailsCard = ({ id, current }) => {
  const { isSeller, isAdmin } = useAuthContext();
  const {
    isEmpty: [isEmpty, setIsEmpty],
    loadId: [loadId, setLoadId],
    source: [source, setSource],
    retailPrice: [retailPrice, setRetailPrice],
    price: [price, setPrice],
    status: [status, setStatus],
    contents: [contents, setContents],
    category: [category, setCategory],
    units: [units, setUnits],
    palletCount: [palletCount, setPalletCount],
    fob: [fob, setFob],
    manifestIds: [manifestIds, setManifestIds],
    files: [files, setFiles],
    owner: [owner, setOwner],
    cost: [cost, setCost],
    commission: [commission, setCommission],
    sales: [sales, setSales],
    accounting: [accounting, setAccounting],
    logistics: [logistics, setLogistics],
    lane: [lane, setLane],
    fileCount: [fileCount, setFileCount],
    imageCount, setImageCount,
    imageIds, setImageIds,
    images, setImages,
  } = useTruckContext();

  const [salesReadMore, setSalesReadMore] = useState(false);
  const [accountingReadMore, setAccountingReadMore] = useState(false);
  const [logisticsReadMore, setLogisticsReadMore] = useState(false);

  return (
    <>
      <section className="truck-section">
        <h2 className="truck-details-header">{source}</h2>
        <div className="truck">
          <div className="truck-info">
            {/* <img src={logo} alt={source} style={{ size: "10rem" }} /> */}
            {images.length > 0 ? (
                <Carousel style={{margin: "0px 0px 24px"}} interval={null}>
                  {images.map((item, index) => {
                    const { image, imageName } = item;
                    return (
                      <Carousel.Item>
                        <Image
                          src={image}
                          style={{ cursor: "pointer" }}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              ) : (
                <img src={logo} alt={source} style={{ size: "10rem" }} />
              )
            }
            {(isSeller() || isAdmin()) &&
              <>
                {/* //^ SALES NOTES */}
                <Card style={{ border: "none" }}>
                  <Card.Header className="all-accordions">
                    <p className="notes-header-wrapper">
                      <span className="truck-data-title">Sales Notes: </span>
                      <Link
                        className="edit-notes-btn edit-notes-header-btn"
                        to={{
                          pathname: `${inventoryPATH}/edit/notes/${id}`,
                          state: { from: current },
                        }}
                      >
                        <FaEdit /> Edit Notes
                      </Link>
                    </p>
                  </Card.Header>
                  <Card.Body
                    style={{ color: "black", backgroundColor: "transparent" }}
                  >
                    {sales.length < 115 && sales.length !== 0 ? (
                      `${sales}`
                    ) : sales.length > 115 ? (
                      <span>
                        {salesReadMore
                          ? sales
                          : `${sales.substring(0, 115)}...`}
                        <button
                          className="show-more-btn"
                          onClick={() => {
                            setSalesReadMore(!salesReadMore);
                          }}
                        >
                          {salesReadMore ? "show less" : "read more"}
                        </button>
                      </span>
                    ) : (
                      <p>No Notes yet</p>
                    )}
                  </Card.Body>
                </Card>
                {/* //^ ACCOUNTING NOTES */}
                <Card style={{ border: "none" }}>
                  <Card.Header className="all-accordions">
                    <p className="notes-header-wrapper">
                      <span className="truck-data-title">
                        Accounting Notes:{" "}
                      </span>

                      <Link
                        className="edit-notes-btn edit-notes-header-btn"
                        to={{
                          pathname: `${inventoryPATH}/edit/notes/${id}`,
                          state: { from: current },
                        }}
                      >
                        <FaEdit /> Edit Notes
                      </Link>
                    </p>
                  </Card.Header>
                  <Card.Body
                    style={{ color: "black", backgroundColor: "transparent" }}
                  >
                    {accounting.length < 115 && accounting.length !== 0 ? (
                      `${accounting}`
                    ) : accounting.length > 115 ? (
                      <span>
                        {accountingReadMore
                          ? accounting
                          : `${accounting.substring(0, 115)}...`}
                        <button
                          className="show-more-btn"
                          onClick={() => {
                            setAccountingReadMore(!accountingReadMore);
                          }}
                        >
                          {accountingReadMore ? "show less" : "read more"}
                        </button>
                      </span>
                    ) : (
                      <p>No Notes yet</p>
                    )}
                  </Card.Body>
                </Card>
                {/* //^ LOGISTICS NOTES */}
                <Card style={{ border: "none" }}>
                  <Card.Header className="all-accordions">
                    <p className="notes-header-wrapper">
                      <span className="truck-data-title">
                        Logistics Notes:{" "}
                      </span>
                      <Link
                        className="edit-notes-btn edit-notes-header-btn"
                        to={{
                          pathname: `${inventoryPATH}/edit/notes/${id}`,
                          state: { from: current },
                        }}
                      >
                        <FaEdit /> Edit Notes
                      </Link>
                    </p>
                  </Card.Header>
                  <Card.Body
                    style={{ color: "black", backgroundColor: "transparent" }}
                  >
                    {logistics.length < 115 && logistics.length !== 0 ? (
                      `${logistics}`
                    ) : logistics.length > 115 ? (
                      <span>
                        {logisticsReadMore
                          ? logistics
                          : `${logistics.substring(0, 115)}...`}
                        <button
                          className="show-more-btn"
                          onClick={() => {
                            setLogisticsReadMore(!logisticsReadMore);
                          }}
                        >
                          {logisticsReadMore ? "show less" : "read more"}
                        </button>
                      </span>
                    ) : (
                      <p>No Notes yet</p>
                    )}
                  </Card.Body>
                </Card>
              </>
            }
          </div>

          <div className="truck-info">
            {/* //^ TRUCK ID CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">ID: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {loadId}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ TRUCK NAME CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Program: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {source}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ TRUCK PRICE CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Price: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    ${price}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ OUR COST CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Cost: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    ${cost}
                  </span>
                </p>
              </Card.Header>
            </Card>

            {/* //^ TRUCK RETAIL PRICE CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Retail Price: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    ${retailPrice}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ COMMISSION CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Commission: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {commission}%
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ CATEGORY CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Category: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {category}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ OWNER CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Owner: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {owner}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ UNITS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Units: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {units}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ PALLETS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Pallets: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {palletCount}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ FOB CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">FOB: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {fob}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ LANE CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Lane: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {lane}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ STATUS CARD */}
            <Card style={{ border: "none" }}>
              <Card.Header
                style={{
                  padding: 0,
                  borderBottom: "none",
                  borderRadius: ".4rem",
                }}
              >
                <p className="data-wrapper">
                  <span className="truck-data-title">Status: </span>
                  <span className="truck-data" style={{ paddingTop: ".5rem" }}>
                    {`${
                      status === 0
                        ? "sold"
                        : status === 1
                        ? "pending"
                        : "available"
                    }`}
                  </span>
                </p>
              </Card.Header>
            </Card>
            {/* //^ TRUCK CONTENTS ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Contents: </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body
                    style={{ color: "black", backgroundColor: "transparent" }}
                  >
                    <span>{contents}</span>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* //^ TRUCK FILES ACCORDION */}
            <Accordion>
              <Card style={{ border: "none" }} className="file-accordion">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="all-accordions"
                >
                  <p className="data-wrapper">
                    <span className="truck-data-title">Files: </span>
                    <span className="truck-data-title">
                      <FaAngleDoubleDown />
                    </span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ backgroundColor: "transparent" }}>
                    {files.map((file, index) => {
                      const { manifest, manifestName } = file;
                      return (
                        <ul key={manifestIds[index]}>
                          <li
                            onClick={
                              () =>
                                window.open(manifest, "_blank") ||
                                window.location.replace(manifest) //Opens in new tab || Opens in same tab if pop ups are blocked
                            }
                          >
                            <span style={{ cursor: "pointer", color: "black" }}>
                              {manifestName}
                            </span>
                          </li>
                        </ul>
                      );
                    })}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default TruckDetailsCard;
