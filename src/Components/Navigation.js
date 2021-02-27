import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaYoutube } from "react-icons/fa";
import { adminLinks, social } from "./nav-data";
import logo from "../img/logo-blue.svg";
import nav from "../css/nav.css";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null); //For DIV
  const linksRef = useRef(null); //For UL

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height; //Returning size values for links
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
          <img src={logo} alt="logo" className="logo"/>
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
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
        {/* <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul> */}
      </div>
    </nav>
  );
};

export default Navigation;

// TP-39
