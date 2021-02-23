import React from "react";

const Contact = () => {
  document.title = "Contact";

  return (
    <>
        <div className="grid-container">
          <div className="menu-grid grid-items-menu">
              <p>HOME</p>
              <p>ORDERS</p>
              <p>INVENTORY</p>
              <p>STATEMENTS</p>
          </div>
          <div className="about-grid grid-items">
            <h1 className="heading">About</h1>
            <div className="underline"></div>
          </div>
          <div className="info-grid grid-items">
            <h1 className="heading">Info</h1>
            <div className="underline"></div>
          </div>
          <div className="paragraph1 grid-items">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Pariatur, ut corporis. Voluptates quas, magni quisquam possimus id
              quam cupiditate odio distinctio similique, atque fugit
              consequuntur aperiam esse nihil voluptatum neque. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Pariatur, ut
              corporis. Voluptates quas, magni quisquam possimus id quam
              cupiditate odio distinctio similique, atque fugit consequuntur
              aperiam esse nihil voluptatum neque.
            </p>
          </div>
          <div className="paragraph2 grid-items">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Pariatur, ut corporis. Voluptates quas, magni quisquam possimus id
              quam cupiditate odio distinctio similique, atque fugit
              consequuntur aperiam esse nihil voluptatum neque. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Pariatur, ut
              corporis. Voluptates quas, magni quisquam possimus id quam
              cupiditate odio distinctio similique, atque fugit consequuntur
              aperiam esse nihil voluptatum neque.
            </p>
          </div>
          <div className="email-grid grid-items">
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
