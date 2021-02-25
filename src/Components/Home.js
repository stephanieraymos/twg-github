import React, { useState } from "react";
import video from "../img/video.mp4";
import warehouse from "../img/warehouse-sm.jpg";
import Contact from "./Contact";
import Inventory from "./Inventory";
import InventoryAllTrucks from "./InventoryAllTrucks";

const Home = () => {
  document.title = "Home";

  const showContactPage = () => {
    return <InventoryAllTrucks />;
  };

  return (
    <>
      <div className="home-container">
        {window.innerWidth >= 900 ? (
          <video className="bg-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img src={warehouse} alt="Warehouse image" className="bg-img" />
        )}
        <div className="content">
          <div className="sub-content">
            <h1 className="home-header">The WholeSale Group</h1>
            <div className="btn-container">
              <button className="btn" onClick={() => showContactPage()}>
                See more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// TP-22
