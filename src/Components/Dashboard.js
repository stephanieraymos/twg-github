import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import Inventory from "./Inventory";

const Dashboard = () => {
  document.title = "Dashboard";
  const { openSidebar, isSidebarOpen } = useGlobalContext();


  return (
    <>
      <main>
        <button className={`${isSidebarOpen ? "sidebar-toggle-dis" : "sidebar-toggle"}`} onClick={openSidebar}>
          <FaBars />
        </button>
        <h1>Dashboard</h1>
      </main>
    </>
  );
};

export default Dashboard;

// TP-21
