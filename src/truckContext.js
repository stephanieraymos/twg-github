import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";
import { url } from "./Pages/urls";

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
  const [sales, setSales] = useState("");
  const [accounting, setAccounting] = useState("");
  const [logistics, setLogistics] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // if (truckLoad.source === "") {
  //   console.log("The truck name is empty but printing");
  // }

  ////////////////////// &&--FUNCTIONS--&& /////////////////////////

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //clearList function. Once list is cleared an alert confirms this to the user + truckLoad is set back to empty array
  // const clearList = () => {
  //   showAlert(true, "danger", "Trucks cleared successfully");
  //   setTruckLoad([]);
  // };

  //removeItem grabs the id of the item to be removed, shows an alert to the user confirming
  //deletion + filters through the truckLoad to keep only the trucks whose id doesn't match the removed truck
  // const removeItem = (id) => {
  //   showAlert(true, "danger", "Truck Removed");
  //   setTruckLoad(truckLoad.filter((truck) => truck.id !== id)); //If truck id does not match then it will be added to new array, if it does match; i won't get returned + won't be displayed
  // };

  //editItem grabs the id of the item to be edited, sets the item and sets all required values
  // const editItem = (id) => {
  //   const specificItem = truckLoad.find((truck) => truck.id === id);
  //   setIsEditing(true);
  //   setEditId(id);
  //   setSource(specificItem.source);
  //   setPrice(specificItem.price);
  //   setRetailPrice(specificItem.retailPrice);
  //   setUnits(specificItem.units);
  //   setPalletCount(specificItem.palletCount);
  //   setCategory(specificItem.category);
  //   setFob(specificItem.fob);
  //   setStatus(specificItem.status);
  //   setContents(specificItem.contents);
  //   setManifests(specificItem.manifests);
  // };

  ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
  return (
    <TruckContext.Provider
      value={{
        isEmpty: [isEmpty, setIsEmpty],
        id: [id, setId],
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

        // clearList,
        // showAlert,
        // editItem,
        // removeItem,

        // // getData,
        // alert,
        // isEditing,
        // editId,
        // setAlert,
        // setIsEditing,
        // setEditId,
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
        const response = await fetch(url,
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
