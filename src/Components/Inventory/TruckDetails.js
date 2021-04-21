import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Loading from "../../Pages/Loading";
import { authService } from "../../authService";
import { getByIdURL, inventoryURL, manifestURL, imageURL } from "../../Pages/urls";
import TruckDetailsCard from "./TruckDetailsCard";
import { FaAngleDoubleLeft, FaTimes, FaEdit } from "react-icons/fa";
import { useTruckContext } from "../../truckContext";
import { Button } from "react-bootstrap";

import { inventoryPATH } from "../../Pages/paths";

const TruckDetails = () => {
  const { id } = useParams();

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
    lane: [lane, setLane],
    fileCount: [fileCount, setFileCount],
    imageCount,
    setImageCount,
    imageIds,
    setImageIds,
    images,
    setImages,
  } = useTruckContext();

  const { is_seller, is_admin } = authService.getUser();

  let history = useHistory();
  let location = useLocation();

  document.title = "Truck Details";

  //^ GET MANIFEST REQUEST //
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

  const deleteTruck = () => {
    const data = new FormData();
    data.append("id", id);
    manifestIds.map((id) => data.append("manifestIds", id));
    authService.checkToken()
      .then(() => {
        fetch(inventoryURL, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${authService.getAccessToken()}`,
          },
          body: data,
        })
          .then(history.replace(inventoryPATH));
      })
      .catch(() => history.push("/logout"))
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
            lane,
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
          setLane(lane);
          setImageIds(imageIds);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      isEmpty ||
      manifestIds.length != fileCount ||
      imageIds.length != imageCount
    ) {
      getTruck();
    }
  }, []);

  useEffect(() => {
    getManifest();
  }, [manifestIds]);

  useEffect(() => {
    getImages();
  }, [imageIds]);

  if (!loadId) {
    return <h2>No truck to display</h2>;
  }

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="truck-details-links-container">
        <Button
          onClick={(e) => {
            e.preventDefault();
            history.replace(inventoryPATH);
          }}
          className="back-to-link"
        >
          <FaAngleDoubleLeft /> Back to inventory
        </Button>

        {(is_seller || is_admin) &&
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
        }
      </div>

      <TruckDetailsCard id={id} current={location.pathname} />
    </>
  );
};

export default TruckDetails;
