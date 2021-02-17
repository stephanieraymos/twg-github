import React from "react";

const Dashboard = () => {
  if (user === admin) {
    document.title = "Admin Dashboard";
  } else {
    document.title = "User Dashboard";
  }

  return (
    <>{user === admin ? <h1>Admin Dashboard</h1> : <h1>User Dashboard</h1>}</>
  );
};

export default Dashboard;