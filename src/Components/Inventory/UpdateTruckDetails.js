import React, { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams, Link } from "react-router-dom";
import { useAuthContext } from "../../auth";
import { getByIdURL, manifestURL, inventoryURL } from "../../Pages/urls";
import UpdateTruckForm from "./UpdateTruckForm";

const UpdateTruckDetails = () => {
  const { id } = useParams();
  const [source, setSource] = useState("");
  const [price, setPrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [units, setUnits] = useState("");
  const [palletCount, setPalletCount] = useState("");
  const [fob, setFob] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(0);
  const [contents, setContents] = useState([]);
  const [manifestIds, setManifestIds] = useState([]);
  const [files, setFiles] = useState([]);
  const [oldManifestIds, setOldManifestIds] = useState([]);
  const [validated, setValidated] = useState(false);
  const [owner, setOwner] = useState("");

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
      updateTruck();
      redirect();
    } else {
      setValidated(true);
    }
  };

  const getManifest = () => {
    if (manifestIds.length > 0) {
      const data = new FormData();
      manifestIds.map((id) => data.append("manifestIds", id));
      fetch(manifestURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((manifest) => setFiles(manifest))
        .catch((error) => {
          console.log(error);
        });
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
            source,
            price,
            retailPrice,
            contents,
            manifestIds,
            category,
            units,
            palletCount,
            fob,
            status,
            owner
          } = data[0];

          setSource(source);
          setPrice(price);
          setRetailPrice(retailPrice);
          setCategory(category);
          setUnits(units);
          setPalletCount(palletCount);
          setContents(contents);
          setManifestIds(manifestIds);
          setStatus(status);
          setFob(fob);
          setOwner(owner);
        } else {
          throw new Error("Truck does not exist.");
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

  useEffect(() => {
    getManifest();
  }, [manifestIds]);

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    const data = new FormData(form.current);
    data.append("id", id);
    data.set("status", status);

    // turn string to array and insert to truck contents
    const tempcontents = data.get("contents").split(",");
    data.delete("contents");
    tempcontents.map((item) => data.append("contents", item));

    oldManifestIds.map((id) => data.append("manifestIds", id));
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
      <h1 className="update-truck-header">Edit truck details</h1>

      <div className="update-truck-form-container">
        <UpdateTruckForm
          form={form}
          validated={validated}
          handleSubmit={handleSubmit}
          source={source}
          price={price}
          retailPrice={retailPrice}
          category={category}
          contents={contents}
          units={units}
          palletCount={palletCount}
          fob={fob}
          setStatus={setStatus}
          files={files}
          manifestIds={manifestIds}
          oldManifestIds={oldManifestIds}
          setOldManifestIds={setOldManifestIds}
          redirect={redirect}
          status={status}
          owner={owner}
        />
      </div>
    </>
  );
};

// TP-51

export default UpdateTruckDetails;
