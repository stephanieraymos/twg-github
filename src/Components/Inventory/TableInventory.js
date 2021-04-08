import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTruck } from "../../truckContext";
import { useAuthContext } from "../../auth";

const TableInventory = () => {
  let history = useHistory();
  const [trucks] = useTruck();

  const { fetchAccessToken } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  }, []);

  return (
    <>
      <table className="table-wrapper" id="table">
        <thead className="header-items">
          <tr className="all-trucks-table-header-load truck">ID</tr>
          <tr className="all-trucks-table-header-program program">
            PROGRAM
          </tr>
          <tr className="all-trucks-table-header-category category">
            CATEGORY
          </tr>
          <tr className="all-trucks-table-header-units units">UNITS</tr>
          <tr className="all-trucks-table-header-pallets pallets">
            PALLETS
          </tr>
          <tr className="all-trucks-table-header-fob fob">FOB</tr>
          <tr className="all-trucks-table-header-retail retail">RETAIL</tr>
          <tr className="all-trucks-table-header-price price">PRICE</tr>
        </thead>
        <tbody className="truckLoad-list">
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
            console.log(trucks);
            return (
              <tr
                className={`${
                  status === 0
                    ? "truckLoad status-row-red"
                    : status === 1
                    ? "truckLoad status-row-green"
                    : "truckLoad status-row-yellow"
                }`}
                key={id}
              >
                <Link
                  to={`/TruckDetails/${id}`}
                  className="items all-trucks-load text-truncate"
                >
                  {loadId}
                </Link>

                <td className="items all-trucks-program text-truncate">
                  {source}
                </td>
                <td className="items all-trucks-category text-truncate">
                  {category}
                </td>
                <td className="items all-trucks-units text-truncate">{units}</td>
                <td className="items all-trucks-pallets text-truncate">
                  {palletCount}
                </td>
                <td className="items all-trucks-fob text-truncate">{fob}</td>
                <td className="items all-trucks-retail text-truncate">
                  ${retailPrice}
                </td>
                <td className="items all-trucks-price text-truncate">${price}</td>
              </tr>
            );
          })}
        </tbody>
        {function() {
    ('#table').DataTable( {
        "order": [[ 3, "status" ]]
    } );
} }
      </table>
    </>
  );
};

export default TableInventory;
