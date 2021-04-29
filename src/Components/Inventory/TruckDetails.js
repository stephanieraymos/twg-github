import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { authService } from "../../authService";
import {
  getByIdURL,
  inventoryURL,
  manifestURL,
  imageURL,
} from "../../Pages/urls";
import TruckDetailsCard from "./TruckDetailsCard";
import { FaAngleDoubleLeft, FaTimes, FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { inventoryPATH } from "../../Pages/paths";
import { useInventoryContext } from "../../inventory";

const TruckDetails = () => {
  const { id } = useParams();

  const {
    getInventoryById,
    deleteInventory,
    loadId,
    setInventory,
    inventory,
  } = useInventoryContext();

  const { is_seller, is_admin } = authService.getUser();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: inventoryPATH } };

  document.title = "Truck Details";

  const deleteTruck = () => {
    const data = new FormData();
    data.append("id", id);
    deleteInventory(data)
      .then(response => {
        setInventory(inventory.filter(item => item.id !== id))
        history.replace(inventoryPATH)
      })
      .catch(error => {
        setInventory(inventory.filter(item => item.id !== id))
        history.replace(inventoryPATH)
      });
  };

  useEffect(() => {
    console.log("called")
    getInventoryById(id)
        .catch((error) => console.log(error))
  }, []);

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="truck-details-links-container">
        <Button
          onClick={(e) => {
            e.preventDefault();
            history.replace(from);
          }}
          className="back-to-link"
        >
          <FaAngleDoubleLeft /> Back to inventory
        </Button>

        {(is_seller || is_admin) && (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                deleteTruck();
              }}
              className="delete-truck-btn"
            >
              <FaTimes /> Delete truck
            </Button>

            <Button
              className="edit-truck-btn"
              onClick={(e) => {
                e.preventDefault();
                history.push(`${inventoryPATH}/edit/${id}`, {
                  from: location.pathname,
                });
              }}
            >
              <FaEdit /> Edit truck
            </Button>
          </>
        )}
      </div>

      <TruckDetailsCard id={id} current={location.pathname} />
    </>
  );
};

export default TruckDetails;
