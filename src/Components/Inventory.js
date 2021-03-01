import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import inventory from "../css/inventory.css";

const Inventory = ({ truckLoad, removeItem, editItem }) => {
  return (
    <>
      <div className="header-items">
        <p className="truck">TRUCK NAME</p>
        <p className="price">PRICE</p>
        <p className="contents">CONTENTS</p>
        <p className="side-btn-container"></p>
      </div>
      <div className="truckLoad-list">
        {truckLoad.map((item) => {
          const { id, truckName, truckPrice, truckContents } = item;
          return (
            <>
              <article key={id} className="truckLoad">
                <p className="items truck">{truckName}</p>
                <p className="items price">${truckPrice}</p>
                <p className="items contents">{truckContents}</p>
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

// <table key={id} className="truckLoad">
// <thead>
//   <tr>
//     <th className="items">Truck name</th>
//     <th className="items">Price</th>
//     <th className="items">Contents</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td className="items">Truck name: {truckName}</td>
//     <td className="items">Price: {truckPrice}</td>
//     <td className="items">Contents: {truckContents}</td>
//     <td className="side-btn-container">
//       <button
//         type="button"
//         className="edit-btn"
//         onClick={() => editItem(id)}
//       >
//         <FaEdit />
//       </button>
//       <button
//         type="button"
//         className="delete-btn"
//         onClick={() => removeItem(id)}
//       >
//         <FaTrash />
//       </button>
//     </td>
//   </tr>
// </tbody>
// </table>

// TP-51
