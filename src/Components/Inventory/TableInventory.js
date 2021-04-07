import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTruck } from "../../truckContext";
import { useAuthContext } from "../../auth";

const TableInventory = () => {
  let history = useHistory();
  const [trucks] = useTruck();

  const {
    fetchAccessToken,
  } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
      })
      .catch((error) => {
        history.push("/");
      });
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <div className="header-items">
          <span className="all-trucks-table-header-load truck">ID</span>
          <span className="all-trucks-table-header-program program">PROGRAM</span>
          <span className="all-trucks-table-header-category category">
            CATEGORY
          </span>
          <span className="all-trucks-table-header-units units">
            UNITS
          </span>
          <span className="all-trucks-table-header-pallets pallets">PALLETS</span>
          <span className="all-trucks-table-header-fob fob">FOB</span>
          <span className="all-trucks-table-header-retail retail">RETAIL</span>
          <span className="all-trucks-table-header-price price">PRICE</span>
        </div>
        <div className="truckLoad-list">
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
            } = truck;

            return (
              <div className="truckLoad" key={id}>
                <Link
                  to={`/TruckDetails/${id}`}
                  className="items all-trucks-load text-truncate"
                >
                  {loadId}
                </Link>

                <p className="items all-trucks-program text-truncate">
                  {source}
                </p>
                <p className="items all-trucks-category text-truncate">
                  {category}
                </p>
                <p className="items all-trucks-units text-truncate">
                  {units}
                </p>
                <p className="items all-trucks-pallets text-truncate">
                  {palletCount}
                </p>
                <p className="items all-trucks-fob text-truncate">
                  {fob}
                </p>
                <p className="items all-trucks-retail text-truncate">
                  ${retailPrice}
                </p>
                <p className="items all-trucks-price text-truncate">
                  ${price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TableInventory;
