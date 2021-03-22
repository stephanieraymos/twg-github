import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Navigation from "./Navigation";

const CustomerDetails = ({ name, orders, cost }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <article className="customer-details">
        <header>
          <h4>
            <span className="key">Name:</span> {name}
          </h4>
          <button className="ac-btn" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </button>
        </header>
        {showInfo && (
          <div>
            <p>
              <span className="key">Total orders:</span> {orders}
            </p>
            <p>
              <span className="key">Spent:</span> ${cost}
            </p>
          </div>
        )}
      </article>
    </>
  );
};

export default CustomerDetails;

// TP-25
