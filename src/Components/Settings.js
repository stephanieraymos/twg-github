import React from "react";
import Navigation from "./Navigation";

const Settings = () => {
  document.title = "Settings";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1>Settings Page</h1>
    </>
  );
};

export default Settings;
