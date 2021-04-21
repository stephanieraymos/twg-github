import React from "react";
import { useTruck } from "../../truckContext";
import dashboard from "../../css/dashboard.css";
import OrderDetails from "../Orders/OrderDetails";
import D3 from "../D3";
import Loading from "../../Pages/Loading";
import { useHistory, Link } from "react-router-dom";
import { userURL } from "../../Pages/urls";

import Navigation from "../Navigation/Navigation";

const Dashboard = () => {
  document.title = "Dashboard";

  const [trucks, loading] = useTruck();

  let history = useHistory();

  const handleViewDetails = () => {
    return <OrderDetails />;
  };

  //GROSS MARGIN

  const grossMarginCalc = trucks.map(function (truck) {
    return truck.price - truck.cost;
  });

  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }
  const grossMargin = getArraySum(grossMarginCalc);

  //Sold 24 hrs
  // const soldDay = () => {
  //   if (trucks[0].status === 0) {
  //     // return trucks.status(0).length;
  //     console.log(trucks[0].status)
  //   }
  // };
  // console.log(soldDay())
  const availStatus = trucks.map(function (truck) {
    return truck.status[2]
  })
  const soldStatus = trucks.map((truck) => {
    return truck.status[0]
  })

  if (availStatus) {
    console.log("Available")
  }
  if (soldStatus) {
    console.log("Sold")
  }

  return (
    <>
      <div>
        <Navigation />
      </div>
      <article className="admin-dashboard-content">
        <h1 className="dashboard-heading">Dashboard</h1>

        <div className="section-container">
          <div className="trucks-available section-items">
            <p className="section-items-desc">Available</p>
            <p className="dash-count">{trucks.length}</p>
          </div>
          <div className="trucks-needing-approval section-items">
            <p className="section-items-desc">Sold 24 hrs</p>
            <p className="dash-count"></p>
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

export default Dashboard;

// TP-21
