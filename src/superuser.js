import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    createContext,
} from "react";
import { superuserURL } from "./Pages/urls";
import { useAuthContext } from "./auth";

// Generating context
const SuperuserContext = createContext();

//Generating provider
const SuperuserProvider = ({ children }) => {
    //////////////////////// &&--STATE--&& /////////////////////////////
    const [users, setUsers] = useState({});
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [dateJoined, setDateJoined] = useState("");
    const [lastLogin, setLastLogin] = useState("");

    const { accessToken } = useAuthContext();

    ////////////////////// &&--FUNCTIONS--&& /////////////////////////
    useEffect(() => {
        fetch(superuserURL, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken(),
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
                for (const user of data) {
                    const userId = user['id'];
                    setUsers(prevState => ({
                        ...prevState,
                        [userId]: user
                    }));
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
    return (
        <SuperuserContext.Provider
            value={{
                users, setUsers,
                id, setId,
                email, setEmail,
                firstName, setFirstName,
                lastName, setLastName,
                company, setCompany,
                phoneNumber, setPhoneNumber,
                billingAddress, setBillingAddress,
                isActive, setIsActive,
                isVerified, setIsVerified,
                isSeller, setIsSeller,
                isAdmin, setIsAdmin,
                isSuperuser, setIsSuperuser,
                dateJoined, setDateJoined,
                lastLogin, setLastLogin,
            }}
        >
            {children}
        </SuperuserContext.Provider>
    );
};

//! Custom hook for using context within app
const useSuperuserContext = () => {
    return useContext(SuperuserContext);
};

export { SuperuserProvider, useSuperuserContext };
