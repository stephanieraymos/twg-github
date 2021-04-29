import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";
import { inventoryV2GetURL } from "./Pages/urls";

// Generating context
const TruckContext = createContext();

//Generating provider
const TruckProvider = ({ children }) => {
  //////////////////////// &&--STATE--&& /////////////////////////////

  // const [truckLoad, setTruckLoad] = useState([]); //INVENTORY LIST ON ADD TRUCKLOAD PAGE
  const [isEmpty, setIsEmpty] = useState(true);
  const [id, setId] = useState("");
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
  const [salesNotes, setSalesNotes] = useState("");
  const [accountingNotes, setAccountingNotes] = useState("");
  const [logisticsNotes, setLogisticsNotes] = useState("");
  const [lane, setLane] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [imageIds, setImageIds] = useState([]);
  const [images, setImages] = useState([]);
  const [sold, setSold] = useState("");
  const [created, setCreated] = useState("");
  const [paid, setPaid] = useState(false);
  const [buyerId, setBuyerId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [shippingStatus, setShippingStatus] = useState(0);

  ////////////////////// &&--FUNCTIONS--&& /////////////////////////

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <TruckContext.Provider
      value={{
        isEmpty,
        setIsEmpty,
        id,
        setId,
        loading,
        setLoading,
        loadId,
        setLoadId,
        source,
        setSource,
        retailPrice,
        setRetailPrice,
        price,
        setPrice,
        status,
        setStatus,
        contents,
        setContents,
        category,
        setCategory,
        units,
        setUnits,
        palletCount,
        setPalletCount,
        fob,
        setFob,
        manifestIds,
        setManifestIds,
        files,
        setFiles,
        owner,
        setOwner,
        cost,
        setCost,
        commission,
        setCommission,
        salesNotes,
        setSalesNotes,
        accountingNotes,
        setAccountingNotes,
        logisticsNotes,
        setLogisticsNotes,
        lane,
        setLane,
        fileCount,
        setFileCount,
        imageCount,
        setImageCount,
        imageIds,
        setImageIds,
        images,
        setImages,
        sold,
        setSold,
        created,
        setCreated,
        paid,
        setPaid,
        buyerId,
        setBuyerId,
        sellerId,
        setSellerId,
        shippingStatus,
        setShippingStatus,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

//! Custom hook for using context within app
const useTruckContext = () => {
  return useContext(TruckContext);
};

//^ useTruck custom hook //

export const useTruck = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [trucks, setTrucks] = useState([]); //LIST OF TRUCKS FROM API
  // const [postRefresh, setPostRefresh] = useState(false);

  // const [trucks, setTrucks] = useReducer((state, value) => [...value], []);
  const reducer = (state, action) => {
    return state.concat(action.value);
  };

  const [trucks, dispatch] = useReducer(reducer, []);

  const addTruck = (truck) => {
    dispatch({ value: truck });
  };

  useEffect(() => {
    const abortCont = new AbortController();

    setLoading(true);

    const fetchTrucks = async () => {
      try {
        const response = await fetch(
          inventoryV2GetURL,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
          {
            signal: abortCont.signal,
          }
        );
        const newTrucks = await response.json(); //returns a promise
        addTruck(newTrucks); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
        setLoading(false);
        setErrorMessage("");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          console.log(error);
          setErrorMessage(error);
        }
      }
    };
    fetchTrucks();
    return () => {
      abortCont.abort();
      console.log("cleanup");
    };
  }, []);

  return [trucks, addTruck, loading, errorMessage];
};

export { TruckProvider, useTruckContext };
