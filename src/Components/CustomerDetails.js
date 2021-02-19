import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const CustomerDetails = ({ name, orders, cost }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className="customer-details">
      <header>
        <h4>Customer Name: {name}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && (
        <div>
          <p>Total orders placed: {orders}</p>
          <p>Total cost of all orders: ${cost}</p>
        </div>
      )}
    </article>
  );
};

export default CustomerDetails;

// TP-25
