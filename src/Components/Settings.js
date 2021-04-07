import React from "react";
import Navigation from "./Navigation/Navigation";

const Settings = () => {
  document.title = "Settings";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1 className="black-header">Settings Page</h1>
    </>
  );
};

export default Settings;
