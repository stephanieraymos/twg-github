import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useParams, Link, useHistory } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { useAuthContext } from "../../auth";
import { getByIdURL, inventoryURL, manifestURL } from "../../Pages/urls";
import TruckDetailsCard from "./TruckDetailsCard";
import { FaAngleDoubleLeft, FaTimes, FaEdit } from "react-icons/fa";

const TruckDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadId, setLoadId] = useState("");
  const [source, setSource] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState("");
  const [units, setUnits] = useState("");
  const [palletCount, setPalletCount] = useState("");
  const [fob, setFob] = useState("");
  const [manifestIds, setManifestIds] = useState([]);
  const [files, setFiles] = useState([]);
  const [owner, setOwner] = useState("");
  const [cost, setCost] = useState("");
  const [commission, setCommission] = useState("");
  const [sales, setSales] = useState("");
  const [accounting, setAccounting] = useState("");
  const [logistics, setLogistics] = useState("");

  const { fetchAccessToken } = useAuthContext();

  const [accessToken, setAccessToken] = useState("");

  let history = useHistory();

  document.title = "Truck Details";

  //^ GET MANIFEST REQUEST //
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

  const deleteTruck = () => {
    const data = new FormData();
    data.append("id", id);
    manifestIds.map((id) => data.append("manifestIds", id));
    fetch(inventoryURL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    }).then(history.push("/trucks"));
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

    setLoading(true);
  }, []);

  useEffect(() => {
    getManifest();
  }, [manifestIds]);

  if (loading) {
    return <Loading />;
  }
  if (!loadId) {
    return <h2>No truck to display</h2>;
  }

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="truck-details-links-container">
        <Link to="/trucks" className="back-to-link">
          <FaAngleDoubleLeft />
          Back to inventory
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            deleteTruck();
          }}
          className="delete-truck-btn"
        >
          <FaTimes /> Delete this truck
        </button>
        <Link className="edit-truck-btn" to={`/UpdateTruckDetails/${id}`}>
          <FaEdit /> Edit this truck
        </Link>
        <Link className="edit-notes-btn" to={`/UpdateNotes/${id}`}>
          <FaEdit /> Edit Notes
        </Link>
      </div>

      <TruckDetailsCard
        source={source}
        loadId={loadId}
        price={price}
        retailPrice={retailPrice}
        category={category}
        units={units}
        palletCount={palletCount}
        fob={fob}
        contents={contents}
        files={files}
        manifestIds={manifestIds}
        deleteTruck={deleteTruck}
        id={id}
        status={status}
        owner={owner}
        cost={cost}
        commission={commission}
        sales={sales}
        accounting={accounting}
        logistics={logistics}
      />
    </>
  );
};

export default TruckDetails;
