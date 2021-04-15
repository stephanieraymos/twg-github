import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social, logoLink } from "./nav-data";
import logo from "../../img/logo-blue.svg";
import nav from "../../css/nav.css";
import { useHistory, Link } from "react-router-dom";
import { useAuthContext } from "../../auth";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null); //For DIV
  const linksRef = useRef(null); //For UL
  const { isSuperuser } = useAuthContext();
  const [filteredLinks, setFilteredLinks] = useState(links);

  // {params != Home ? <Navigation /> : null}
  useEffect(() => {
    if (!isSuperuser()) {
      setFilteredLinks(filteredLinks.filter(item => item.text !== "Superuser"))
    }
  }, []);

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
            {filteredLinks.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
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
