import React, { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams } from "react-router-dom";
import { useAuthContext } from "../../auth";
import { getByIdURL, inventoryURL } from "../../Pages/urls";
import UpdateNotesForm from "./UpdateNotesForm";

const UpdateNotes = () => {
  const { id } = useParams();
  const [sales, setSales] = useState("");
  const [logistics, setLogistics] = useState("");
  const [accounting, setAccounting] = useState("");
  const [validated, setValidated] = useState(false);

  const { fetchAccessToken } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  let history = useHistory();

  document.title = "Add Inventory";

  const form = useRef(null);

  const redirect = () => {
    history.push(`/TruckDetails/${id}`);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
      updateNotes();
      redirect();
    } else {
      setValidated(true);
    }
  };

  const getTruck = () => {
    fetch(`${getByIdURL}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const {
            sales,
            logistics,
            accounting,
          } = data[0];

          setSales(sales);
          setLogistics(logistics);
          setAccounting(accounting);
        } else {
          throw new Error("Error getting notes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // send user back to login if they're not logged in
    fetchAccessToken
      .then((token) => {
        setAccessToken(token);
        getTruck();
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  }, []);

  // Return true or false to indicate if fetch was successful
  const updateNotes = () => {
    const data = new FormData(form.current);
    data.append("id", id);

    fetch(inventoryURL, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return true;
        } else return false;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <Navigation />
      </div>
      <h1 className="update-truck-header">Add Notes</h1>

      <div className="update-truck-form-container">
        <UpdateNotesForm
          form={form}
          validated={validated}
          handleSubmit={handleSubmit}
          sales={sales}
          accounting={accounting}
          logistics={logistics}
          redirect={redirect}
        />
      </div>
    </>
  );
};

// TP-51

export default UpdateNotes;
