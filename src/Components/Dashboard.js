import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useTruck } from "../truckContext";
import dashboard from "../css/dashboard.css";
import OrderDetails from "./Orders/OrderDetails";
import D3 from "./D3";
import Loading from "../Pages/Loading";
import { useAuthContext } from "../auth";
import { useHistory } from "react-router-dom";
import { userURL } from "../Pages/urls";

const Dashboard = () => {
  document.title = "Dashboard";
  const { fetchAccessToken } = useAuthContext();
  const {
    openSidebar,
    isSidebarOpen,
    userId,
    setUserId,
    setEmail,
    setFirstName,
    setLastName,
    setCompany,
    setPhoneNumber,
    setBillingAddress
  } = useGlobalContext();
  // const { getData } = useTruckContext();
  const [trucks, loading] = useTruck();

  //const [userId, setUserId] = useState(localStorage.getItem('userId'));

  let history = useHistory();


  const handleViewDetails = () => {
    return <OrderDetails />;
  };

  const getUserDetails = (accessToken) => {
    fetch(userURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        const res = response.json();
        console.log(res);
        if (response.ok) {
          return res;
        } else {
          throw new Error(res.message);
        }
      })
      .then((user) => {
        setUserId(user["id"]);
        setEmail(user["email"]);
        setFirstName(user["first_name"]);
        setLastName(user["last_name"]);
        setCompany(user["company"]);
        setPhoneNumber(user["phone_number"]);
        setBillingAddress(user["billing_address"]);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    console.log("userId", userId);
    fetchAccessToken
      .then((token) => {
        getUserDetails(token);
      })
      .catch((error) => {
        console.log(error)
        history.push("/");
      });
  }, []);

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
            <p className="dash-count">{trucks.length}</p>
          </div>
          <div className="trucks-needing-approval section-items">
            <p className="section-items-desc">Needing Approval</p>
            <p className="dash-count">14</p>
          </div>
          <div className="trucks-sold-30days section-items">
            <p className="section-items-desc">Sold Last 30 Days</p>
            <p className="dash-count">100</p>
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
