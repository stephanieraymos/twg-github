import React from "react";
import Navigation from "./Navigation";

const Dashboard = () => {
  if (user === admin) {
    document.title = "Admin Dashboard";
  } else {
    document.title = "User Dashboard";
  }

  return (
    <>
      <div>
        <Navigation />
      </div>
      {user === admin ? <h1>Admin Dashboard</h1> : <h1>User Dashboard</h1>}
    </>
  );
};

export default Dashboard;

// TP-21
