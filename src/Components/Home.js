import React, { useState } from "react";

const Home = () => {
  document.title = "Home";

  return (
    <>
      <h1 className="home-header">The WholeSale Group</h1>
      <div className="btn-container">
        <button className="btn">See more</button>
      </div>
    </>
  );
};

export default Home;

// TP-22
