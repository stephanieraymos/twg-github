import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
    // URLs to communicate with the auth API
    const tokenVerifyURL = "https://api.thewholesalegroup.com/v1/account/token/verify/";
    const tokenRefreshURL = "https://api.thewholesalegroup.com/v1/account/token/refresh/";

    // keys for the cookies
    const accessTokenKey = "user-access-token";
    const refreshTokenKey = "user-refresh-token";

    const [cookies, setCookie, removeCookie] = useCookies([accessTokenKey, refreshTokenKey]);
    
    const removeTokens = () => {
        removeCookie(accessTokenKey);
        removeCookie(refreshTokenKey);
    }

    const setAccessToken = (token) => {
        setCookie(accessTokenKey, token, {
          path: "/",
          // secure: true,
          maxAge: 3600, // 1 hour
        });
    };
    
    const setRefreshToken = (token) => {
        setCookie(refreshTokenKey, token, {
            path: "/",
            // secure: true,
            maxAge: 604800, // 7 days
        });
    };

    const fetchRefreshToken = () => {
        return cookies[refreshTokenKey];
    }

    const fetchAccessToken = new Promise((resolve, reject) => {
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
                    // access token is valid
                    resolve(accessToken);
                } else {
                    // access token is not valid
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
                            if (response.ok) {
                                // user is logged in again
                                return response.json();
                            } else {
                                reject("User is not logged in.")
                            }
                        })
                        .then((token) => {
                            if (token) {
                                setAccessToken(token["access"]);
                                resolve(token["access"]);
                            }
                        })
                        .catch((error) => {
                            reject("User is not logged in.")
                        });
                    } else {
                        reject("User is not logged in.")
                    }
                }
            })
            .catch((error) => {
                reject("User is not logged in.")
            })
        } else {
            reject("User is not logged in.")
        }
    });

    const data = {
        setAccessToken,
        setRefreshToken,
        removeTokens,
        fetchAccessToken,
        fetchRefreshToken,
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };