import React from "react";
import grid from "../grid.css";

const Contact = () => {
  document.title = "Contact";

  return (
    <>
      <div className="grid-container">
        <div className="header-grid">The WholeSale Group</div>
        <div className="menu-grid">
          <ul>
            <li>HOME</li>
            <li>ORDERS</li>
            <li>INVENTORY</li>
            <li>STATEMENTS</li>
          </ul>
        </div>
        <div className="about-grid">
          <div className="section-header">About</div>
          <div className="underline"></div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            ut corporis. Voluptates quas, magni quisquam possimus id quam
            cupiditate odio distinctio similique, atque fugit consequuntur
            aperiam esse nihil voluptatum neque. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Pariatur, ut corporis. Voluptates
            quas, magni quisquam possimus id quam cupiditate odio distinctio
            similique, atque fugit consequuntur aperiam esse nihil voluptatum
            neque.
          </p>
        </div>
        <div className="email-grid">
          <p>Sales: email@email.com</p>
          <p>Support: email@email.com</p>
          <p>Upline: email@email.com</p>
        </div>
      </div>
    </>
  );
};

export default Contact;

// TP-43
