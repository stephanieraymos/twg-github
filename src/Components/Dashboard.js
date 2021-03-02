import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Dashboard = () => {
  document.title = "Dashboard";
  const { openSidebar, isSidebarOpen } = useGlobalContext();


  return (
    <>
      <main>
        <button className={`${isSidebarOpen ? "sidebar-toggle-dis" : "sidebar-toggle"}`} onClick={openSidebar}>
          <FaBars />
        </button>
      </main>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;

// TP-21
