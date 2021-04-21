import React, { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { authService } from "../../authService";
import { getByIdURL, manifestURL, inventoryURL, imageURL } from "../../Pages/urls";
import UpdateTruckForm from "./UpdateTruckForm";
import { useTruckContext } from "../../truckContext";

import { inventoryPATH } from "../../Pages/paths";

const UpdateTruckDetails = () => {
  const { id } = useParams();
  const [oldManifestIds, setOldManifestIds] = useState([]);
  const [oldImageIds, setOldImageIds] = useState([]);
  const [validated, setValidated] = useState(false);

  const {
    isEmpty, setIsEmpty,
    setId,
    setLoadId,
    setSource,
    setRetailPrice,
    setPrice,
    status, setStatus,
    setContents,
    setCategory,
    setUnits,
    setPalletCount,
    setFob,
    manifestIds, setManifestIds,
    setFiles,
    setOwner,
    setCost,
    setCommission,
    setSalesNotes,
    setAccountingNotes,
    setLogisticsNotes,
    setLane,
    setFileCount,
    setImageCount,
    imageIds, setImageIds,
    setImages
  } = useTruckContext();

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
    } else {
      setValidated(true);
    }
  };

  const getManifest = () => {
    setFileCount(manifestIds.length);
    if (manifestIds.length > 0) {
      const data = new FormData();
      manifestIds.map((id) => data.append("manifestIds", id));
      authService.checkToken()
        .then(() => {
          fetch(manifestURL, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${authService.getAccessToken()}`,
            },
            body: data,
          })
            .then((response) => response.json())
            .then((manifest) => setFiles(manifest))
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => history.push("/logout"))
    } else {
      setFiles([]);
    }
  };

  const getImages = () => {
    setImageCount(imageIds.length);
    if (imageIds.length > 0) {
      const data = new FormData();
      imageIds.map((id) => data.append("imageIds", id));
      authService.checkToken()
        .then(() => {
          fetch(imageURL, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${authService.getAccessToken()}`,
            },
            body: data,
          })
            .then((response) => response.json())
            .then((images) => setImages(images))
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => history.push("/logout"))
    } else {
      setImages([]);
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
            lane,
            imageIds,
          } = data[0];

          setId(id);
          setIsEmpty(false);
          setLoadId(loadId);
          setSource(source);
          setPrice(price);
          setCost(cost);
          setCommission(commission);
          setRetailPrice(retailPrice);
          setContents(contents.join(","));
          setManifestIds(manifestIds);
          setCategory(category);
          setUnits(units);
          setPalletCount(palletCount);
          setFob(fob);
          setStatus(status);
          setOwner(owner);
          setSalesNotes(sales);
          setAccountingNotes(accounting);
          setLogisticsNotes(logistics);
          setLane(lane);
          setImageIds(imageIds);
        } else {
          throw new Error("Truck does not exist.");
        }
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    getImages();
  }, [imageIds]);

  // Return true or false to indicate if fetch was successful
  const updateTruck = () => {
    const data = new FormData(form.current);
    data.append("id", id);
    data.set("status", status);

    // turn string to array and insert to truck contents
    const tempContents = data.get("contents").split(",");
    data.delete("contents");
    tempContents.map((item) => data.append("contents", item));

    oldManifestIds.map((id) => data.append("manifestIds", id));
    oldImageIds.map((id) => data.append("imageIds", id));
    authService.checkToken()
      .then(() => {
        fetch(inventoryURL, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${authService.getAccessToken()}`,
          },
          body: data,
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              redirect();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => history.push("/logout"))
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
          oldManifestIds={oldManifestIds}
          setOldManifestIds={setOldManifestIds}
          oldImageIds={oldImageIds}
          setOldImageIds={setOldImageIds}
          redirect={redirect}
        />
      </div>
    </>
  );
};

// TP-51

export default UpdateTruckDetails;
