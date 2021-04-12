import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useParams, Link, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { useAuthContext } from "../../auth";
import { getByIdURL, inventoryURL, manifestURL } from "../../Pages/urls";
import TruckDetailsCard from "./TruckDetailsCard";
import { FaAngleDoubleLeft, FaTimes, FaEdit } from "react-icons/fa";
import { useTruckContext } from "../../truckContext";
import { Button } from "react-bootstrap";

import { inventoryPATH } from "../../Pages/paths";

const TruckDetails = () => {
  const { id } = useParams();

  const {
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

  let { path, url } = useRouteMatch();

  document.title = "Truck Details";

  //^ GET MANIFEST REQUEST //
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
    // fetchAccessToken
    //   .then((token) => {
    //     setAccessToken(token);
    //     getTruck();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     history.push("/");
    //   });
    getTruck();
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
        <Button onClick={(e) => {
            e.preventDefault();
            history.replace(inventoryPATH);
          }} className="back-to-link" >
          <FaAngleDoubleLeft /> Back to inventory
        </Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            deleteTruck();
          }} className="delete-truck-btn" >
          <FaTimes /> Delete truck
        </Button>
        
        <Button className="edit-truck-btn" onClick={(e) => {
            history.push(`${inventoryPATH}/edit/${id}`);
          }} >
          <FaEdit /> Edit truck
        </Button>
        <Button className="edit-notes-btn" to={`/UpdateNotes/${id}`}>
          <FaEdit /> Edit Notes
        </Button>
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
