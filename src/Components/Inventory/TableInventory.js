import React, { useState, useEffect } from "react";
import { useTruck } from "../../truckContext";
import { useAuthContext } from "../../auth";
import { Table } from "react-bootstrap";
import { sorttable } from "sorttable";

import {
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";

const TableInventory = () => {
  let history = useHistory();
  const [trucks] = useTruck();

  let { url } = useRouteMatch();

  return (
    <>
      <div className="table-wrapper">
        <Table className="sortable" responsive>
          <thead className="header-items">
            <tr>
              <th id="id" >ID</th>
              <th id="program">PROGRAM</th>
              <th> CATEGORY</th>
              <th>UNITS</th>
              <th>PALLETS</th>
              <th>FOB</th>
              <th>RETAIL</th>
              <th>PRICE</th>
              <th width={"5px"}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck) => {
              let {
                id,
                loadId,
                price,
                source,
                category,
                units,
                palletCount,
                fob,
                retailPrice,
                status,
              } = truck;
              return (
                <tr
                  className={`${
                    status === 0
                      ? "status-row-red"
                      : status === 1
                      ? "status-row-green"
                      : "status-row-yellow"
                  }`}
                  key={id}
                >
                  <td>
                    <Link className="table-id-link" to={`${url}/${id}`} >
                      {loadId}
                    </Link>
                  </td>
                  <td>{source}</td>
                  <td>{category}</td>
                  <td>{units}</td>
                  <td>{palletCount}</td>
                  <td>{fob}</td>
                  <td>${retailPrice}</td>
                  <td>${price}</td>
                  <td style={{fontSize:"10px", textAlign:"center"}}>{`${
                    status === 0
                      ? "sold"
                      : status === 1
                      ? "available"
                      : "pending"
                  }`}</td>
                  {/* <td><td className={`${
                    status === 0
                      ? "s-circle"
                      : status === 1
                      ? "a-circle"
                      : "p-circle"
                  }`}>{status}</td></td> */}


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
