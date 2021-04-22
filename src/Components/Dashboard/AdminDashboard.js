import React, { useState, useEffect } from "react";
import { useTruck } from "../../truckContext";
import { usePersistedState } from "../../usePersistedState";
import dashboard from "../../css/dashboard.css";
import OrderDetails from "../Orders/OrderDetails";

import Navigation from "../Navigation/Navigation";

const AdminDashboard = () => {
  document.title = "Dashboard";
  const [soldDay, setSoldDay] = useState(0);
  const [isSold, setIsSold] = useState(false);
  const [trucks, loading, status, price, cost, sold] = useTruck();

  const handleViewDetails = () => {
    return <OrderDetails />;
  };

  //GROSS MARGIN
  const grossMarginCalc = trucks.map(function (truck) {
    const { price, cost } = truck;
    return price - cost;
  });

  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }
  const grossMargin = getArraySum(grossMarginCalc);

  // Sold 24 hrs

  //  {status === 0 && setSoldDay(status.length)}
  if (status === 0) {
    setIsSold(true);
  }
  useEffect(() => {
    console.log("isSold", isSold);
    console.log("status", status);
  }, []);
  //@TODO status is false when changing above conditional statement parameter to status ===0 , but once I refresh the page, the status is true
  return (
    <>
      <article className="admin-dashboard-content">
        <div className="section-container">
          <div className="trucks-available section-items">
            <p className="section-items-desc">Available</p>
            <p className="dash-count">{trucks.length}</p>
          </div>
          <div className="trucks-needing-approval section-items">
            <p className="section-items-desc">Sold 24 hrs</p>
            <p className="dash-count">{soldDay}</p>
          </div>
          <div className="trucks-sold-30days section-items">
            <p className="section-items-desc">Gross Margin 24 hrs</p>
            <p className="dash-count">{grossMargin}</p>
          </div>
          <div className="trucks-contacts section-items">
            <p className="section-items-desc">Contacts</p>
            <p className="dash-count">64</p>
          </div>
        </div>

        <div className="sales-graph-container">
          <div className="sales-graph">
            <p className="sales-graph-heading">Sales</p>
            <p className="sales-graph-date-range">March 2021 insights</p>
            <p className="graph">GRAPH CONTENTS</p>
          </div>
        </div>
        {/* <D3 /> */}

        <div className="bottom-content">
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
