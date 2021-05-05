import React, { useState, useEffect, useContext, createContext } from "react";
import {
  inventoryV2GetURL,
  inventoryV2GetByIdURL,
  inventoryV2GetBySellerIdURL,
  inventoryV2GetByBuyerIdURL,
  inventoryV2URL,
  inventoryV2FilesURL,
} from "./Pages/urls";
import { authService } from "./authService";
import { useHistory } from "react-router-dom";
import { create } from "d3-selection";

// Generating context
const InventoryContext = createContext();

//Generating provider
const InventoryProvider = ({ children }) => {
  //////////////////////// &&--STATE--&& /////////////////////////////
  const [id, setId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [loadId, setLoadId] = useState("");
  const [category, setCategory] = useState("");
  const [commission, setCommission] = useState(0.0);
  const [contents, setContents] = useState([]);
  const [cost, setCost] = useState(0.0);
  const [created, setCreated] = useState("");
  const [fob, setFob] = useState("");
  const [lane, setLane] = useState("");
  const [owner, setOwner] = useState("");
  const [palletCount, setPalletCount] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [retailPrice, setRetailPrice] = useState(0.0);
  const [source, setSource] = useState("");
  const [units, setUnits] = useState(0);
  const [paid, setPaid] = useState(false);
  const [shippingStatus, setShippingStatus] = useState(0);
  const [condition, setCondition] = useState(0);
  const [sold, setSold] = useState("");
  const [status, setStatus] = useState(2);
  const [accountingNotes, setAccountingNotes] = useState("");
  const [logisticsNotes, setLogisticsNotes] = useState("");
  const [salesNotes, setSalesNotes] = useState("");
  const [images, setImages] = useState([]);
  const [manifests, setManifests] = useState([]);
  const [seal, setSeal] = useState("");
  const [bol, setBol] = useState("");

  // EXTRA
  const [inventory, setInventory] = useState([]);
  const [imageObjects, setImageObjects] = useState([]);
  const [manifestObjects, setManifestObjects] = useState([]);

  let history = useHistory();

  ////////////////////// &&--FUNCTIONS--&& /////////////////////////
  //^ FETCH INVENTORY
  useEffect(() => {
    console.log("Starting Inventory...");
    authService
      .checkToken()
      .then(() => {
        fetch(inventoryV2GetURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response);
            }
          })
          .then((data) => {
            setInventory(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => history.push("/logout"));
  }, []);

  //^ ---- GET INVENTORY BY ID ----
  const getInventoryById = (id) => {
    return new Promise((resolve, reject) => {
      authService
        .checkToken()
        .then(() => {
          fetch(`${inventoryV2GetByIdURL}${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                reject(response);
              }
            })
            .then((data) => {
              const {
                id,
                seller_id,
                buyer_id,
                load_id,
                category,
                commission,
                contents,
                cost,
                created,
                fob,
                condition,
                lane,
                owner,
                pallet_count,
                price,
                retail_price,
                source,
                units,
                paid,
                shipping_status,
                sold,
                status,
                accounting,
                logistics,
                sales,
                images,
                manifests,
                seal,
                bol,
              } = data[0];
              setId(id);
              setSellerId(seller_id);
              setBuyerId(buyer_id);
              setLoadId(load_id);
              setCategory(category);
              setCommission(commission);
              setContents(contents);
              setCost(cost);
              setCreated(created);
              setFob(fob);
              setLane(lane);
              setOwner(owner);
              setPalletCount(pallet_count);
              setCondition(condition);
              setPrice(price);
              setRetailPrice(retail_price);
              setSource(source);
              setUnits(units);
              setPaid(paid);
              setShippingStatus(shipping_status);
              setSold(sold);
              setStatus(status);
              setAccountingNotes(accounting);
              setLogisticsNotes(logistics);
              setSalesNotes(sales);
              setImages(images);
              setManifests(manifests);
              setSeal(seal);
              setBol(bol);
              getInventoryFiles(images, manifests);
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => history.push("/logout"));
    });
  };

  //^ ---- GET INVENTORY BY BUYER ID ----
  const getInventoryByBuyerId = (id) => {
    return new Promise((resolve, reject) => {
      authService
        .checkToken()
        .then(() => {
          fetch(`${inventoryV2GetByBuyerIdURL}${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                reject(response);
              }
            })
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => history.push("/logout"));
    });
  };

  //^ ---- GET INVENTORY BY SELLER ID ----
  const getInventoryBySellerId = (id) => {
    return new Promise((resolve, reject) => {
      authService
        .checkToken()
        .then(() => {
          fetch(`${inventoryV2GetBySellerIdURL}${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                reject(response);
              }
            })
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => history.push("/logout"));
    });
  };

  // fet files from Spaces
  const getInventoryFiles = (images, manifests) => {
    const data = new FormData();
    images.map((item) => data.append("images", item));
    manifests.map((item) => data.append("manifests", item));
    data.forEach(([key, value]) => console.log(key, value));
    authService
      .checkToken()
      .then(() => {
        fetch(inventoryV2FilesURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authService.getAccessToken()}`,
          },
          body: data,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log("getInventoryFiles Error:", response);
            }
          })
          .then((files) => {
            if ("images" in files) setImageObjects(files["images"]);
            else setImageObjects([]);

            if ("manifests" in files) setManifestObjects(files["manifests"]);
            else setManifestObjects([]);
          })
          .catch((error) => {
            console.log("getInventoryFiles Error:", error);
          });
      })
      .catch(() => history.push("/logout"));
  };

  // post to inventory API
  const addInventory = (data) => {
    return new Promise((resolve, reject) => {
      authService
        .checkToken()
        .then(() => {
          fetch(inventoryV2URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authService.getAccessToken()}`,
            },
            body: data,
          })
            .then((response) => {
              if (response.ok) {
                resolve(response.json());
              } else {
                reject(response);
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => history.push("/logout"));
    });
  };

  // delete from inventory API
  const deleteInventory = (data) => {
    return new Promise((resolve, reject) => {
      authService
        .checkToken()
        .then(() => {
          fetch(inventoryV2URL, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authService.getAccessToken()}`,
            },
            body: data,
          })
            .then((response) => {
              if (response.ok) {
                resolve(response.json());
              } else {
                reject(response);
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => history.push("/logout"));
    });
  };

  // post to inventory API
  const updateInventory = (data) => {
    return new Promise((resolve, reject) => {
      authService
        .checkToken()
        .then(() => {
          fetch(inventoryV2URL, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authService.getAccessToken()}`,
            },
            body: data,
          })
            .then((response) => {
              if (response.ok) {
                resolve(response.json());
              } else {
                reject(response);
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => history.push("/logout"));
    });
  };

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <InventoryContext.Provider
      value={{
        inventory,
        setInventory,
        getInventoryById,
        getInventoryByBuyerId,
        getInventoryBySellerId,
        addInventory,
        deleteInventory,
        updateInventory,
        id,
        setId,
        sellerId,
        setSellerId,
        buyerId,
        setBuyerId,
        loadId,
        setLoadId,
        category,
        setCategory,
        commission,
        setCommission,
        contents,
        setContents,
        cost,
        setCost,
        created,
        setCreated,
        fob,
        setFob,
        condition,
        setCondition,
        lane,
        setLane,
        owner,
        setOwner,
        palletCount,
        setPalletCount,
        price,
        setPrice,
        retailPrice,
        setRetailPrice,
        source,
        setSource,
        units,
        setUnits,
        paid,
        setPaid,
        shippingStatus,
        setShippingStatus,
        sold,
        setSold,
        status,
        setStatus,
        accountingNotes,
        setAccountingNotes,
        logisticsNotes,
        setLogisticsNotes,
        salesNotes,
        setSalesNotes,
        images,
        setImages,
        manifests,
        setManifests,
        imageObjects,
        setImageObjects,
        manifestObjects,
        setManifestObjects,
        seal,
        setSeal,
        bol,
        setBol,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

//! Custom hook for using context within app
const useInventoryContext = () => {
  return useContext(InventoryContext);
};

export { InventoryProvider, useInventoryContext };
