import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context";
import inventory from "../css/inventory.css";

const Inventory = () => {
  const { truckLoad, removeItem, editItem } = useGlobalContext();

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
       


            <>
              <article key={truckLoad.id} className="truckLoad">
                <p className="items truck">{truckLoad.truckName}</p>
                <p className="items price">${truckLoad.truckPrice}</p>
                <p className="items contents">{truckLoad.truckContents}</p>
                <p data-testid="manifestEl" className="items manifest">{truckLoad.truckManifest}</p>
                <div className="side-btn-container">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editItem(truckLoad.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem(truckLoad.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            </>


      </div>
    </>
  );
};

export default Inventory;

// TP-51
