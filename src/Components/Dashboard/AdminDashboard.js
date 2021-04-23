import React, { useState, useEffect } from "react";
import { useTruck } from "../../truckContext";
import { useInventoryContext } from "../../inventory";
import { usePersistedState } from "../../usePersistedState";
import dashboard from "../../css/dashboard.css";
import OrderDetails from "../Orders/OrderDetails";
import LineChart from "../D3/LineChart";

const AdminDashboard = () => {
  document.title = "Dashboard";

  //& -------- LOCAL STATE --------
  const [soldDay, setSoldDay] = useState(0);
  const [availableInventory, setAvailableInventory] = useState([]);

  //& -------- CONTEXT --------
  const [trucks] = useTruck();
  const { inventory } = useInventoryContext();

  //& -------- VARIABLES --------

  //& -------- FUNCTIONS --------

  //^ GROSS MARGIN
  const grossMarginCalc = trucks.map(function (truck) {
    const { price, cost } = truck;
    return price - cost;
  });
  const grossMargin = getArraySum(grossMarginCalc);

  //^ GET SUM OF ARRAY
  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }

  //^ HANDLE ORDER DETAILS VIEW
  const handleViewDetails = () => {
    return <OrderDetails />;
  };

  //^ AVAILABLE INVENTORY
  useEffect(() => {
    setAvailableInventory(inventory.filter((item) => item.status === 2));
  }, [inventory]);

  // @TODO Create a seperate component with reusable pieces for the dashboard

  //& -------- RETURN --------
  return (
    <>
      <article className="admin-dashboard-content">
        {/* //* ---- AVAILABLE INVENTORY ---- */}
        <div className="section-container">
          <div className="trucks-available section-items">
            <p className="section-items-desc">Available</p>
            <p className="dash-count">{availableInventory.length}</p>
          </div>
          {/* //* ---- SOLD 24 HOURS ---- */}
          <div className="trucks-needing-approval section-items">
            <p className="section-items-desc">Sold 24 hrs</p>
            <p className="dash-count">{soldDay}</p>
          </div>
          {/* //* ---- GROSS MARGIN ---- */}
          <div className="trucks-sold-30days section-items">
            <p className="section-items-desc">Gross Margin 24 hrs</p>
            <p className="dash-count">{grossMargin}</p>
          </div>
          {/* //* ---- CONTACTS ---- */}
          <div className="trucks-contacts section-items">
            <p className="section-items-desc">Contacts</p>
            <p className="dash-count">64</p>
          </div>
        </div>
        {/* //* ---- GRAPH ---- */}

        <LineChart />

        {/* //* ---- FOOTER CONTENT ---- */}
        <div className="bottom-content">
          {/* //* ---- NEW LEADS ---- */}
          <div className="new-leads-container bottom-content-items">
            <div className="top-leads-container">
              <p className="leads-container-header">New Leads</p>
              <a href="/OrderDetails">
                <p className="leads-view-more">View Details</p>
              </a>
            </div>
            <div className="lead-items">
              <div className="lead-item">
                <p className="lead-items-left">Waiting on Feature Request</p>
                <p>4238</p>
              </div>
              <div className="lead-item">
                <p className="lead-items-left">Awaiting Customer Response</p>
                <p>1005</p>
              </div>
              <div className="lead-item">
                <p className="lead-items-left">Awaiting Developer Fix</p>
                <p>42</p>
              </div>
              <div className="lead-item">
                <p className="lead-items-left">Pending</p>
                <p>281</p>
              </div>
            </div>
          </div>
          {/* //* ---- ORDERS NEEDING APPROVAL ---- */}
          <div className="orders-to-approve-container bottom-content-items">
            <div className="top-leads-container">
              <p className="leads-container-header">Orders Needing Approval</p>
              <a href="/Orders">
                <p className="leads-view-more">View All</p>
              </a>
            </div>
            <div className="lead-items">
              <div className="lead-item">
                <p>TRUCK123456</p>
                <p>$456</p>
              </div>
              <div className="lead-item">
                <p>TRUCK123456</p>
                <p>$456</p>
              </div>
              <div className="lead-item">
                <p>TRUCK123456</p>
                <p>$456</p>
              </div>
              <div className="lead-item">
                <p>TRUCK123456</p>
                <p>$456</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default AdminDashboard;

// TP-21
