import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context";
import inventory from "../css/inventory.css";

const Inventory = () => {
  const { trucks, removeItem, editItem } = useGlobalContext();

  return (
    <>
      <div className="header-items">
        <p className="truck">TRUCK NAME</p>
        <p className="price">PRICE</p>
        <p className="contents">CONTENTS</p>
        <p className="manifest">MANIFEST</p>
        <p className="side-btn-container"></p>
      </div>

      <div className="truckLoad-list">
        {trucks.map((truck) => {
          const {
            id,
            truckName,
            truckPrice,
            truckContents,
            truckManifest,
          } = truck;

          return (
            <>
              <article key={id} className="truckLoad">
                <p className="items truck">{truckName}</p>
                <p className="items price">${truckPrice}</p>
                <p className="items contents">{truckContents}</p>
                <p data-testid="manifestEl" className="items manifest">
                  {truckManifest}
                </p>
                <div className="side-btn-container">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editItem(id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem(id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Inventory;

// TP-51
