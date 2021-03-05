import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import video from "../img/video.mp4";
import warehouse from "../img/warehouse-sm.jpg";
import { useGlobalContext } from "./context";
import modalandsidebar from "../css/modalandsidebar.css";

const Home = () => {
  document.title = "Home";
  const { openModal, isModalOpen } = useGlobalContext();

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
          <main>
            <button className="modal-btn" onClick={openModal}>
              Login / Signup
            </button>
          </main>
          <div className={`${isModalOpen ? "sub-content-dis" : "sub-content"}`}>
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
