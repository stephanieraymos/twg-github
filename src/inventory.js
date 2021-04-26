import React, {
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";
import { url, getByBuyerIdURL, getBySellerIdURL } from "./Pages/urls";
import { authService } from "./authService";
import { useHistory } from "react-router-dom";


// Generating context
const InventoryContext = createContext();

//Generating provider
const InventoryProvider = ({ children }) => {
    //////////////////////// &&--STATE--&& /////////////////////////////
    const [id, setId] = useState("");
    const [loadId, setLoadId] = useState("");
    const [source, setSource] = useState("");
    const [category, setCategory] = useState("");
    const [units, setUnits] = useState(0);
    const [palletCount, setPalletCount] = useState(0);
    const [fob, setFob] = useState("");
    const [retailPrice, setRetailPrice] = useState(0.0);
    const [price, setPrice] = useState(0.0);
    const [sellerId, setSellerId] = useState("");
    const [buyerId, setBuyerId] = useState("");
    const [manifestIds, setManifestIds] = useState([]);
    const [created, setCreated] = useState("");
    const [status, setStatus] = useState(1);
    const [contents, setContents] = useState([]);
    const [cost, setCost] = useState(0.0);
    const [commission, setCommission] = useState(0.0);
    const [owner, setOwner] = useState("");
    const [lane, setLane] = useState("");
    const [salesNotes, setSalesNotes] = useState("");
    const [accountingNotes, setAccountingNotes] = useState("");
    const [logisticsNotes, setLogisticsNotes] = useState("");
    const [imageIds, setImageIds] = useState([]);
    const [sold, setSold] = useState("");
    const [paid, setPaid] = useState(false);

    // EXTRA
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [manifests, setManifests] = useState([]);
    const [images, setImages] = useState([]);


    let history = useHistory();

    ////////////////////// &&--FUNCTIONS--&& /////////////////////////
    //^ FETCH INVENTORY
    useEffect(() => {
        console.log("Starting Inventory...")
        authService.checkToken()
            .then(() => {
                fetch(url, {
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
                        console.log(error)
                    });
            })
            .catch(() => history.push("/logout"))
    }, []);

    //^ ---- GET INVENTORY BY ID ----
    const getInventoryById = (id) => {
        return new Promise((resolve, reject) => {
            authService.checkToken()
                .then(() => {
                    fetch(`${url}${id}`, {
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
                .catch(() => history.push("/logout"))
        })
    };

    //^ ---- GET INVENTORY BY BUYER ID ----
    const getInventoryByBuyerId = (id) => {
        return new Promise((resolve, reject) => {
            authService.checkToken()
                .then(() => {
                    fetch(`${getByBuyerIdURL}${id}`, {
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
                .catch(() => history.push("/logout"))
        })
    };

    //^ ---- GET INVENTORY BY SELLER ID ----
    const getInventoryBySellerId = (id) => {
        return new Promise((resolve, reject) => {
            authService.checkToken()
                .then(() => {
                    fetch(`${getBySellerIdURL}${id}`, {
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
                .catch(() => history.push("/logout"))
        })
    };


    ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
    return (
        <InventoryContext.Provider
            value={{
                inventory, setInventory,
                getInventoryById,
                getInventoryByBuyerId,
                getInventoryBySellerId,
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
