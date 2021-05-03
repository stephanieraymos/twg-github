import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { sorttable } from "sorttable";

import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useInventoryContext } from "../../inventory";

const TableInventory = ({ trucks }) => {
  let history = useHistory();

  let { url } = useRouteMatch();

  function dynamicSort(property) {
    return function (a, b) {
      return b[property] - a[property];
    };
  }
  trucks.sort(dynamicSort("status"));

  const { inventory } = useInventoryContext();

  return (
    <>
      <div className="table-wrapper">
        <Table className="sortable inventory-table" responsive>
          <thead className="header-items">
            <tr>
              <th id="id">ID</th>
              <th id="program">PROGRAM</th>
              <th> CATEGORY</th>
              <th>UNITS</th>
              <th>PALLETS</th>
              <th>FOB</th>
              <th>RETAIL</th>
              <th>PRICE</th>
              <th width={"5px"} className="sort">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              let {
                id,
                load_id,
                price,
                source,
                category,
                units,
                pallet_count,
                fob,
                retail_price,
                status,
              } = item;

              return (
                <tr
                  className={`${
                    status === 0
                      ? "status-row-red"
                      : status === 1
                      ? "status-row-yellow"
                      : "status-row-green"
                  }`}
                  key={id}
                >
                  <td>
                    <Link className="table-id-link" to={`${url}/${id}`}>
                      {load_id}
                    </Link>
                  </td>
                  <td>{source}</td>
                  <td>{category}</td>
                  <td>{units}</td>
                  <td>{pallet_count}</td>
                  <td>{fob}</td>
                  <td>{`${
                    status === 0
                      ? "SOLD"
                      : status === 1
                      ? `${retail_price}`
                      : `${retail_price}`
                  }`}</td>
                  <td>{`${
                    status === 0
                      ? "SOLD"
                      : status === 1
                      ? `${price}`
                      : `${price}`
                  }`}</td>
                  <td style={{ fontSize: "10px", textAlign: "center" }}>{`${
                    status === 0
                      ? "sold"
                      : status === 1
                      ? "pending"
                      : "available"
                  }`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableInventory;
