import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import Inventory from "./Inventory";
import dashboard from "../css/dashboard.css";


const Dashboard = () => {
  document.title = "Dashboard";
  const { openSidebar, isSidebarOpen } = useGlobalContext();

  return (
    <>
      <article className="admin-dashboard-content">
        <button
          className={`${
            isSidebarOpen ? "sidebar-toggle-dis" : "sidebar-toggle"
          }`}
          onClick={openSidebar}
        >
          <FaBars />
        </button>

        <h1 className="dashboard-heading">Dashboard</h1>
        
        <div className="section-container">
          <div className="trucks-available section-items">
            <h2>Trucks Available</h2>
            <p>143</p>
            {/* <p>{trucks.length}</p> */}
          </div>
          <div className="trucks-needing-approval section-items">
            <h2>Needing Approval</h2>
            <p>14</p>
          </div>
          <div className="trucks-sold-30days section-items">
            <h2>Sold Last 30 Days</h2>
            <p>100</p>
          </div>
          <div className="trucks-contacts section-items">
            <h2>Contacts</h2>
            <p>64</p>
          </div>
        </div>
        {/* <div className="dashboard-inventory">
          <Inventory />
        </div> */}
      </article>
    </>
  );
};

export default Dashboard;

// TP-21
