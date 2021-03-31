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
    
    const removeToken = () => {
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

    const accessToken = () => cookies[accessTokenKey];
    
    const setRefreshToken = (token) => {
        setCookie(refreshTokenKey, token, {
            path: "/",
            // secure: true,
            maxAge: 604800, // 7 days
        });
    };

    const refreshToken = () => cookies[refreshTokenKey];

    const isAccessTokenValid = () => {
        if (cookies["user-access-token"]) {
            fetch(tokenVerifyURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: cookies["user-access-token"],
                }),
            })
            .then((response) => {
                if (response.ok) {
                    // token is valid
                    return true;
                }
            })
        }

        return false;
    }

    const authenticate = (success=() => {}, failure=() => {}) => {
        // check whether there's cookies to check
        if (cookies["user-access-token"]) {
            success();
            return;
        } else if (cookies["user-refresh-token"]) {
            // user might have a refresh token that have not expired yet
            fetch(tokenRefreshURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    refresh: cookies["user-refresh-token"],
                }),
            })
            .then((response) => {
                if (response.ok) {
                    // user is logged in again
                    const user = response.json();
                    setAccessToken(user["access"]);
                    success();
                    return;
                }
            })
            .catch((error) => {
                
            });
        }

        failure();
    };

    const data = {
        accessToken: [accessToken, setAccessToken],
        refreshToken: [refreshToken, setRefreshToken],
        authenticate,
        removeToken,
        isAccessTokenValid,
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };