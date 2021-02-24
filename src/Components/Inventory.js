import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Inventory = ({ truckLoad }) => {
  return (
    <div className="truckLoad-list">
      {truckLoad.map((item) => {
        const { id, truckName, truckPrice, truckContents } = item;
        return (
          <article key={id} className="truckLoad">
            <p className="items">Truck name: {truckName}</p>
            <p className="items">Price: {truckPrice}</p>
            <p className="items">Contents: {truckContents}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn">
                <FaEdit />
              </button>
              <button type="button" className="delete-btn">
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};


export default Inventory;

// TP-51
