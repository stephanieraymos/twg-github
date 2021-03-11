import React, { useRef, useEffect } from "react";
import logo from "../img/logo-blue.svg";
import { FaTimes } from "react-icons/fa";
import { social, links } from "./nav-data";
import { useGlobalContext } from "../context";
import modalandsidebar from "../css/modalandsidebar.css";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  const outerDiv = useRef(); //* This reference is used to refer to the outer div, it's purpose is for closing the sidebar when clicked anywhere but the sidebar

  //* This useEffect is to add event listeners for the click off sidebar
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (outerDiv.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    {
      closeSidebar();
    }
  };

  return (
    <div ref={outerDiv}>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <a href="/">
            <img src={logo} className="logo" alt="Logo" />
          </a>
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map((link) => {
            const { id, url, text, icon } = link;
            return (
              <li key={id}>
                <a href={url}>
                  {icon}
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="social-icons">
          {social.map((link) => {
            const { id, url, icon } = link;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
