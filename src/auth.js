import React, { useContext, useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { tokenVerifyURL, tokenRefreshURL, userURL, loginURL, registerURL, logoutURL } from "./Pages/urls"

const AuthContext = React.createContext(null)

/*  
IMPORTANT: Change PRODUCTION to true when releasing to production
*/
const PRODUCTION = false;

const AuthProvider = ({ children }) => {
    // URLs to communicate with the auth API

    const maxAgeShort = 3600;
    const maxAgeLong = 604800;
    // keys for the cookies
    const accessTokenKey = "user-access-token";
    const refreshTokenKey = "user-refresh-token";
    const userKey = "user";
    // keys for the local storage
    const userIdKey = "user-id";
    const isSellerKey = "is-seller";
    const isAdminKey = "is-admin";
    const isSuperuserKey = "is-superuser";

    const [cookies, setCookie, removeCookie] = useCookies([accessTokenKey, refreshTokenKey, userKey]);

    useEffect(() => {
        authenticate()
            .catch((error) => {
                console.log("Authenticate Error:", error)
            });

        // run authenticate every hour
        setInterval(() => {
            authenticate()
                .catch((error) => {
                    console.log("Authenticate Error:", error)
                });
        }, maxAgeShort * 1000);
    }, [])

    const removeTokens = () => {
        removeCookie(accessTokenKey);
        removeCookie(refreshTokenKey);
        removeCookie(userKey);
    }

    const setAccessToken = (token) => {
        setCookie(accessTokenKey, token, {
            path: "/",
            secure: PRODUCTION,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const setRefreshToken = (token) => {
        setCookie(refreshTokenKey, token, {
            path: "/",
            secure: PRODUCTION,
            maxAge: maxAgeLong // 7 days
        });
    };

    const setIsAuthenticated = (value) => {
        setCookie(userKey, value, {
            path: "/",
            secure: PRODUCTION,
            maxAge: maxAgeShort, // 1 hour
        });
    };

    const setUserId = (value) => {
        localStorage.setItem(userIdKey, value);
    };

    const setIsSeller = (value) => {
        localStorage.setItem(isSellerKey, value);
    };

    const setIsAdmin = (value) => {
        localStorage.setItem(isAdminKey, value);
    };

    const setIsSuperuser = (value) => {
        localStorage.setItem(isSuperuserKey, value);
    };

    const refreshToken = () => {
        return cookies[refreshTokenKey];
    }

    const accessToken = () => {
        return cookies[accessTokenKey];
    }

    const isAuthenticated = () => {
        return cookies[userKey] === 'true';
    };

    const userId = () => {
        return localStorage.getItem(userIdKey);
    };

    const isSeller = () => {
        return localStorage.getItem(isSellerKey);
    };

    const isAdmin = () => {
        return localStorage.getItem(isAdminKey);
    };

    const isSuperuser = () => {
        return localStorage.getItem(isSuperuserKey);
    };

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
                    setIsAuthenticated(true);
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

    const logout = () => {
        return new Promise((resolve, reject) => {
            fetch(logoutURL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken()}`,
                },
                body: JSON.stringify({
                  refresh: refreshToken(),
                }),
              })
                .then((response) => {
                    console.log("logout response", response)
                    removeTokens();
                    resolve(true);
                })
                .catch((error) => {
                    console.log("logout error", error)
                    removeTokens();
                    reject(error);
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

    const checkAccessToken = (token) => {
        return new Promise((resolve, reject) => {
            fetch(tokenVerifyURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        // access token is valid
                        resolve(response);
                    } else {
                        throw new Error("Access token is invalid.");
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        });
    };

    const checkRefreshToken = (token) => {
        return new Promise((resolve, reject) => {
            fetch(tokenRefreshURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    refresh: token,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        // user is logged in again
                        resolve(response.json());
                    } else {
                        throw new Error("Refresh token is invalid.");
                    }
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    const checkToken = () => {
        return new Promise((resolve, reject) => {
            const accessToken = cookies[accessTokenKey];
            const refreshToken = cookies[refreshTokenKey];
            if (accessToken && refreshToken) {
                checkAccessToken(accessToken)
                    .then(() => {
                        getUser(accessToken)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    })
                    .catch(() => {
                        checkRefreshToken(refreshToken)
                            .then((token) => {
                                setAccessToken(token["access"]);
                                getUser(token["access"])
                                    .then((response) => {
                                        resolve(response);
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    })
                            })
                            .catch(() => {
                                // if we get here, then refresh token is  invalid as well
                                reject("User is not logged in.")
                            })
                    })
            } else if (refreshToken) {
                // user might have a refresh token that have not expired yet
                checkRefreshToken(refreshToken)
                    .then((token) => {
                        setAccessToken(token["access"]);
                        getUser(token["access"])
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    })
                    .catch(() => {
                        // if we get here, then refresh token is  invalid as well
                        reject("User is not logged in.")
                    })
            } else {
                // if we get here, then refresh token is  invalid as well
                reject("User is not logged in.")
            }
        });
    };

    const authenticate = () => {
        return new Promise((resolve, reject) => {
            checkToken()
                .then(() => {
                    setIsAuthenticated(true);
                    resolve(true);
                })
                .catch((error) => {
                    setIsAuthenticated(false);
                    reject(error)
                });
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
        logout,
        isAuthenticated,
        authenticate,
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };