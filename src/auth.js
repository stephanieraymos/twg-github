import React, { useContext, useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { tokenVerifyURL, tokenRefreshURL, userURL, loginURL, registerURL } from "./Pages/urls"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
    // URLs to communicate with the auth API

    const maxAgeShort = 3600;
    const maxAgeLong = 604800;
    // keys for the cookies
    const accessTokenKey = "user-access-token";
    const refreshTokenKey = "user-refresh-token";
    const userIdKey = "user-id";
    const isSellerKey = "is-seller";
    const isAdminKey = "is-admin";
    const isSuperuserKey = "is-superuser";

    const [cookies, setCookie, removeCookie] = useCookies([accessTokenKey, refreshTokenKey, userIdKey, isSellerKey, isAdminKey, isSuperuserKey]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // run authenticate on start
    setTimeout(() => {
        runAuth();
    });
    
    // run authenticate every hour
    setInterval(() => {
        runAuth();
    }, maxAgeShort * 1000);

    const runAuth = () => {
        authenticate()
            .then(() => {
                console.log("isAuthenticated", isAuthenticated);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const removeTokens = () => {
        removeCookie(accessTokenKey);
        removeCookie(refreshTokenKey);
    }

    const setAccessToken = (token) => {
        setCookie(accessTokenKey, token, {
            path: "/",
            // secure: true,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const setRefreshToken = (token) => {
        setCookie(refreshTokenKey, token, {
            path: "/",
            // secure: true,
            maxAge: maxAgeLong // 7 days
        });
    };

    const setUserId = (value) => {
        setCookie(userIdKey, value, {
            path: "/",
            // secure: true,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const setIsSeller = (value) => {
        setCookie(isSellerKey, value, {
            path: "/",
            // secure: true,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const setIsAdmin = (value) => {
        setCookie(isAdminKey, value, {
            path: "/",
            // secure: true,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const setIsSuperuser = (value) => {
        setCookie(isSuperuserKey, value, {
            path: "/",
            // secure: true,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const refreshToken = () => {
        return cookies[refreshTokenKey];
    }

    const accessToken = () => {
        return cookies[accessTokenKey];
    }

    const userId = () => {
        return cookies[userIdKey];
    };

    const isSeller = () => {
        return cookies[isSellerKey];
    };

    const isAdmin = () => {
        return cookies[isAdminKey];
    };

    const isSuperuser = () => {
        return cookies[isSuperuserKey];
    };

    // const fetchAccessToken = new Promise((resolve, reject) => {
    //     const accessToken = cookies[accessTokenKey];
    //     if (accessToken) {
    //         fetch(tokenVerifyURL, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 token: accessToken,
    //             }),
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     // access token is valid
    //                     resolve(accessToken);
    //                 } else {
    //                     // access token is not valid
    //                     // use refresh token to get a new access token
    //                     const refreshToken = cookies[refreshTokenKey];
    //                     if (refreshToken) {
    //                         // user might have a refresh token that have not expired yet
    //                         fetch(tokenRefreshURL, {
    //                             method: "POST",
    //                             headers: { "Content-Type": "application/json" },
    //                             body: JSON.stringify({
    //                                 refresh: refreshToken,
    //                             }),
    //                         })
    //                             .then((response) => {
    //                                 if (response.ok) {
    //                                     // user is logged in again
    //                                     return response.json();
    //                                 } else {
    //                                     reject("User is not logged in.")
    //                                 }
    //                             })
    //                             .then((token) => {
    //                                 if (token) {
    //                                     setAccessToken(token["access"]);
    //                                     resolve(token["access"]);
    //                                 }
    //                             })
    //                             .catch((error) => {
    //                                 reject("User is not logged in.")
    //                             });
    //                     } else {
    //                         reject("User is not logged in.")
    //                     }
    //                 }
    //             })
    //             .catch((error) => {
    //                 reject("User is not logged in.")
    //             })
    //     } else {
    //         reject("User is not logged in.")
    //     }
    // });

    const login = (data) => {
        return new Promise((resolve, reject) => {
            fetch(loginURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
              })
                .then((response) => {
                  const res = response.json();
                  if (response.ok) {
                    return res;
                  } else {
                    throw new Error(res.message);
                  }
                })
                .then((user) => {
                  setUserId(user["id"]);
                  setIsSeller(user["is_seller"]);
                  setIsAdmin(user["is_admin"]);
                  setIsSuperuser(user["is_superuser"]);
                  setAccessToken(user["token"]["access"]);
                  setRefreshToken(user["token"]["refresh"]);
                  // return the whole json response at the end
                  resolve(user)
                })
                .catch((error) => {
                  reject(error)
                });
        });
    };

    const register = (data) => {
        return new Promise((resolve, reject) => {
            fetch(registerURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
              })
                .then((response) => {
                  const res = response.json();
                  if (response.ok) {
                    resolve(res)
                  } else {
                    throw new Error(res.message);
                  }
                })
                .catch((error) => {
                  reject(error)
                });
        });
    };

    const changePassword = (data) => {
        return new Promise((resolve, reject) => {
            
        });
    };

    const resetPassword = (data) => {
        return new Promise((resolve, reject) => {
            
        });
    };

    const emailVerification = (data) => {
        return new Promise((resolve, reject) => {
            
        });
    };

    const getUser = (token) => {
        return new Promise((resolve, reject) => {
            fetch(userURL, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token, 
                },
              })
                .then((response) => {
                  const res = response.json();
                  if (response.ok) {
                    return res;
                  } else {
                    throw new Error(res.message);
                  }
                })
                .then((user) => {
                  setUserId(user["id"]);
                  setIsSeller(user["is_seller"]);
                  setIsAdmin(user["is_admin"]);
                  setIsSuperuser(user["is_superuser"]);
                  // return the whole json response at the end
                  resolve(true)
                })
                .catch((error) => {
                  reject(error)
                });
        });
    };

    const authenticate = () => {
        return new Promise((resolve, reject) => {
            setIsAuthenticated(false);
            console.log("checking access token");
            const accessToken = cookies[accessTokenKey];
            if (accessToken) {
                fetch(tokenVerifyURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: accessToken,
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            // access token is valid so we can retreive user data
                            setIsAuthenticated(true);
                            getUser(accessToken)
                                .then((response) => {
                                    resolve(response);
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            }
    
            console.log("checking refresh token");
            // access token is not valid if we get here
            // use refresh token to get a new access token
            const refreshToken = cookies[refreshTokenKey];
            if (refreshToken) {
                // user might have a refresh token that have not expired yet
                fetch(tokenRefreshURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        refresh: refreshToken,
                    }),
                })
                    .then((response) => {
                        const res = response.json();
                        if (response.ok) {
                            // user is logged in again
                            return res;
                        } else {
                            throw new Error(res.message);
                        }
                    })
                    .then((token) => {
                        setIsAuthenticated(true);
                        setAccessToken(token["access"]);
                        getUser(token["access"])
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    })
                    .catch((error) => {
                        reject(error)
                    });
            }
    
            console.log("All tokens were invalid so we couldn't authenticate.")
    
    
    
            // if we get here, then refresh token is  invalid as well
            reject("User is not logged in.")
        });
    };

    const data = {
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        removeTokens,

        userId,
        isSeller,
        isAdmin,
        isSuperuser,
        setUserId,
        setIsSeller,
        setIsAdmin,
        setIsSuperuser,

        login, 
        register,
        isAuthenticated,
        authenticate,
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
    return useContext(AuthContext);
};

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuthContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export { AuthProvider, useAuthContext, PrivateRoute };