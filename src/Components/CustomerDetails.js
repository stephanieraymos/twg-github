
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const CustomerDetails = ({ name, orders }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className="customer-details">
      <header>
        <h4>{name}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {
            showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />
          }
        </button>
      </header>
      {
        showInfo && <p>{orders}</p>
      }
    </article>
  );
};

export default CustomerDetails;

// TP-25