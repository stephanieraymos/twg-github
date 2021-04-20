import React, { useState, useRef, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { authService } from "../../authService";
import { getByIdURL, inventoryURL, manifestURL, imageURL } from "../../Pages/urls";
import UpdateNotesForm from "./UpdateNotesForm";
import { useTruckContext } from "../../truckContext";

const UpdateNotes = () => {
  const { id } = useParams();
  // const [sales, setSales] = useState("");
  // const [logistics, setLogistics] = useState("");
  // const [accounting, setAccounting] = useState("");
  const [validated, setValidated] = useState(false);

  let history = useHistory();

  document.title = "Add Inventory";

  const form = useRef(null);

  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const {
    isEmpty: [isEmpty, setIsEmpty],
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
    fileCount: [fileCount, setFileCount],
    imageCount, setImageCount,
    imageIds, setImageIds,
    images, setImages
  } = useTruckContext();

  const redirect = () => {
    history.replace(from);
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

  const getManifest = () => {
    setFileCount(manifestIds.length)
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
            imageIds,
          } = data[0];

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
          setSales(sales);
          setAccounting(accounting);
          setLogistics(logistics);
          setImageIds(imageIds);
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
  const updateNotes = () => {
    const data = new FormData(form.current);
    data.append("id", id);
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
              return true;
            } else return false;
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
      <h1 className="update-truck-header">Add Notes</h1>

      <div className="update-truck-form-container">
        <UpdateNotesForm
          form={form}
          validated={validated}
          handleSubmit={handleSubmit}
          redirect={redirect}
        />
      </div>
    </>
  );
};

// TP-51

export default UpdateNotes;
