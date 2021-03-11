import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social, logoLink } from "./nav-data";
import logo from "../img/logo-blue.svg";
import nav from "../css/nav.css";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null); //For DIV
  const linksRef = useRef(null); //For UL

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height; //* Returning size values for links
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]); //Everytime showLinks changes, run the useEffect

  return (
    <nav>
      <div className="nav-center">

        <div className="nav-header">
          {logoLink.map((logoIcon) => {
            const { id, url } = logoIcon;
            return (
              <a key={id} href={url}>
                <img src={logo} alt="logo" className="logo" />
              </a>
            );
          })}

          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        
        <div className="nav-links-container" ref={linksContainerRef}>
          <ul className="nav-links" ref={linksRef}>
            {links.map((link) => {
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
