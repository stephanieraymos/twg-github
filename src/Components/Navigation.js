import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaYoutube } from "react-icons/fa";
import { adminLinks, social } from "./nav-data";
import logo from "../img/logo-blue.svg";
import nav from "../css/nav.css";

const Navigation = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo"/>
          <button className="nav-toggle">
            <FaBars />
          </button>
        </div>
        <div className="links-container show-container">
          <ul className="links">
            {adminLinks.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


// TP-39
