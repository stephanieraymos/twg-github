import React, {
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";
import { superuserURL } from "../Pages/urls";
import { authService } from "../authService";
import { useHistory } from "react-router-dom";

// Generating context
const SuperuserContext = createContext();

//Generating provider
const SuperuserProvider = ({ children }) => {
    //////////////////////// &&--STATE--&& /////////////////////////////
    const [users, setUsers] = useState({});
    const [username, setUsername] = useState("");
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
    const [isTeamMember, setIsTeamMember] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [dateJoined, setDateJoined] = useState("");
    const [lastLogin, setLastLogin] = useState("");

    let history = useHistory();

    ////////////////////// &&--FUNCTIONS--&& /////////////////////////
    //^ FETCH USER
    useEffect(() => {
        authService.checkToken()
            .then(() => {
                fetch(superuserURL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authService.getAccessToken()}`,
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
                        const newData = {}
                        for (const user of data) {
                            newData[user['id']] = user;
                        }
                        setUsers(prevState => ({
                            ...prevState,
                            ...newData
                        }));
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            })
            .catch(() => history.push("/logout"))
    }, []);

    //^ ---- GET USER BY ID ----
    const getUserById = (id) => {
        return new Promise((resolve, reject) => {
            authService.checkToken()
                .then(() => {
                    fetch(`${superuserURL}?id=${id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authService.getAccessToken()}`,
                        },
                    })
                        .then((response) => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error(response);
                            }
                        })
                        .then((user) => {
                            setId(user["id"])
                            setEmail(user["email"]);
                            setUsername(user["name"]);
                            setFirstName(user["first_name"]);
                            setLastName(user["last_name"]);
                            setCompany(user["company"]);
                            setPhoneNumber(user["phone_number"]);
                            setBillingAddress(user["billing_address"]);
                            setIsActive(user["is_active"]);
                            setIsVerified(user["is_verified"]);
                            setIsSeller(user["is_seller"]);
                            setIsTeamMember(user["is_team_member"]);
                            setIsAdmin(user["is_admin"]);
                            setIsSuperuser(user["is_superuser"]);
                            setDateJoined(user["date_joined"]);
                            setLastLogin(user["last_login"]);
                            resolve(user);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch(() => history.push("/logout"))
        })
    };

    const boolToString = (value) => (value ? 1 : 0).toString();

    //^ ---- CREATE USER ----
    const createUser = (data) => {
        const formatedData = {};

        for (const key in data) {
            const value = data[key];
            if (typeof value === "boolean")
                formatedData[key] = boolToString(value);
            else
                formatedData[key] = value;
        }
        
        return new Promise((resolve, reject) => {
            authService.checkToken()
                .then(() => {
                    fetch(superuserURL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authService.getAccessToken()}`,
                        },
                        body: JSON.stringify(formatedData),
                    })
                        .then((response) => {
                            if (response.ok) {
                                resolve(response.json());
                            } else {
                                throw new Error(response);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch(() => history.push("/logout"))
        });
    };

    //^ ---- UPDATE USER ----
    const updateUser = (data) => {
        const formatedData = {};

        for (const key in data) {
            const value = data[key];
            if (typeof value === "boolean")
                formatedData[key] = boolToString(value);
            else
                formatedData[key] = value;
        }
        
        return new Promise((resolve, reject) => {
            authService.checkToken()
                .then(() => {
                    fetch(superuserURL, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authService.getAccessToken()}`,
                        },
                        body: JSON.stringify(formatedData),
                    })
                        .then((response) => {
                            if (response.ok) {
                                resolve(response.json());
                            } else {
                                throw new Error(response);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch(() => history.push("/logout"))
        });
    };

    ////////////////////////// &&--PROVIDER--&& ///////////////////////////////
    return (
        <SuperuserContext.Provider
            value={{
                users, setUsers,
                id, setId,
                email, setEmail,
                username, setUsername,
                firstName, setFirstName,
                lastName, setLastName,
                company, setCompany,
                phoneNumber, setPhoneNumber,
                billingAddress, setBillingAddress,
                isActive, setIsActive,
                isVerified, setIsVerified,
                isSeller, setIsSeller,
                isTeamMember, setIsTeamMember,
                isAdmin, setIsAdmin,
                isSuperuser, setIsSuperuser,
                dateJoined, setDateJoined,
                lastLogin, setLastLogin,
                getUserById,
                createUser,
                updateUser,
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
