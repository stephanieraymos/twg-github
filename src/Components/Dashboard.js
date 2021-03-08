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
            <p className="section-items-desc">Trucks Available</p>
            <h2>143</h2>
            {/* <p>{trucks.length}</p> */}
          </div>
          <div className="trucks-needing-approval section-items">
            <p className="section-items-desc">Needing Approval</p>
            <h2>14</h2>
          </div>
          <div className="trucks-sold-30days section-items">
            <p className="section-items-desc">Sold Last 30 Days</p>
            <h2>100</h2>
          </div>
          <div className="trucks-contacts section-items">
            <p className="section-items-desc">Contacts</p>
            <h2>64</h2>
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
