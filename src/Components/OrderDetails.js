import React from "react";
import Navigation from "./Navigation";

const OrderDetails = () => {
  document.title = "Order Details";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1 className="black-header">Order Details</h1>
    </>
  );
};

export default OrderDetails;

// TP-49
