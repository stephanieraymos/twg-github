import React, { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams, Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../auth";
import { getByIdURL, manifestURL, inventoryURL } from "../../Pages/urls";
import UpdateTruckForm from "./UpdateTruckForm";
import { useTruckContext } from "../../truckContext";

import { inventoryPATH } from "../../Pages/paths";

const UpdateTruckDetails = () => {
  const { id } = useParams();
  // const [source, setSource] = useState("");
  // const [price, setPrice] = useState("");
  // const [retailPrice, setRetailPrice] = useState("");
  // const [units, setUnits] = useState("");
  // const [palletCount, setPalletCount] = useState("");
  // const [fob, setFob] = useState("");
  // const [category, setCategory] = useState("");
  // const [status, setStatus] = useState(0);
  // const [contents, setContents] = useState([]);
  // const [manifestIds, setManifestIds] = useState([]);
  // const [files, setFiles] = useState([]);
  const [oldManifestIds, setOldManifestIds] = useState([]);
  const [validated, setValidated] = useState(false);
  // const [owner, setOwner] = useState("");
  // const [cost, setCost] = useState("");
  // const [commission, setCommission] = useState("");

  const {
    isEmpty: [isEmpty, setIsEmpty],
    loading: [loading, setLoading],
    loadId: [loadId, setLoadId],
    source: [source, setSource],
    retailPrice: [retailPrice, setRetailPrice],
    price: [price, setPrice],
    status: [status, setStatus],
    contents: [contents, setContents],
    category: [category, setCategory],
    units: [units, setUnits],
    palletCount: [palletCount, setPalletCount],
    fob: [fob, setFob],
    manifestIds: [manifestIds, setManifestIds],
    files: [files, setFiles],
    owner: [owner, setOwner],
    cost: [cost, setCost],
    commission: [commission, setCommission],
    sales: [sales, setSales],
    accounting: [accounting, setAccounting],
    logistics: [logistics, setLogistics],
  } = useTruckContext();

  const { accessToken } = useAuthContext();

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  document.title = "Add Inventory";

  const form = useRef(null);

  const redirect = () => {
    history.replace(from);
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
          Authorization: `Bearer ${accessToken()}`,
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
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const {
            loadId,
            source,
            price,
            cost,
            commission,
            retailPrice,
            category,
            fob,
            units,
            palletCount,
            contents,
            manifestIds,
            status,
            owner,
            sales,
            accounting,
            logistics,
          } = data[0];

          setIsEmpty(false);
          setLoadId(loadId);
          setSource(source);
          setPrice(price);
          setCost(cost);
          setCommission(commission);
          setRetailPrice(retailPrice);
          setContents(contents.join(", "));
          setManifestIds(manifestIds);
          setCategory(category);
          setUnits(units);
          setPalletCount(palletCount);
          setFob(fob);
          setStatus(status);
          setOwner(owner);
          setSales(sales);
          setAccounting(accounting);
          setLogistics(logistics);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isEmpty) {
      getTruck();
    }
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
        Authorization: "Bearer " + accessToken(),
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
          cost={cost}
          commission={commission}
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
