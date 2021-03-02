import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import video from "../img/video.mp4";
import warehouse from "../img/warehouse-sm.jpg";
import Contact from "./Contact";
import Inventory from "./Inventory";
import { useGlobalContext } from "./context";

const Home = () => {
  document.title = "Home";
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <>
      <div className="home-container">
        {/* <main>
          <button className="sidebar-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
          <button className="btn" onClick={openModal}>
            Show Modal
          </button>
        </main> */}
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
              <a href="/AddInventory" className="center-btn">
                <button className="btn">See more</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// TP-22
