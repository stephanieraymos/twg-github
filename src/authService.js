import { Subject } from 'rxjs';
import {
    tokenVerifyURL,
    tokenRefreshURL,
    userURL,
    userUpdateURL,
    loginURL,
    registerURL,
    logoutURL,
    passwordChangeURL,
    resetPasswordEmailURL,
    resetPasswordURL,
    emailVerificationURL,
} from "./Pages/urls";

// CONSTANT
const userKey = "user";     // stores the user data
const isAuthKey = "is_auth";     // whether user is authenticated
const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";


// SUBJECTS
const userSubject = new Subject();
const authSubject = new Subject();

// USER
const getUserSubscriber = () => userSubject.asObservable();
const getUser = () => {
    const user = localStorage.getItem(userKey);
    if (user)
        return JSON.parse(user);
    else
        return null;
};
const setUser = (user) =>  {
    localStorage.setItem(userKey, JSON.stringify(user));
    userSubject.next(user)
};


// AUTH
const getIsAuth = () => localStorage.getItem(isAuthKey) === "true";
// const getUser = () => userSubject.asObservable();
const getAuthSubscriber = () => authSubject.asObservable();
const setIsAuth = (value) => {
    localStorage.setItem(isAuthKey, value);
    authSubject.next(value)
};


// TOKEN
const setAccessToken = (token) => localStorage.setItem(accessTokenKey, token);
const getAccessToken = () => localStorage.getItem(accessTokenKey);
const setRefreshToken = (token) => localStorage.setItem(refreshTokenKey, token);
const getRefreshToken = () => localStorage.getItem(refreshTokenKey);
const refreshAccessToken = () => {
    const refreshToken = getRefreshToken();
    return new Promise((resolve, reject) => {
        if (refreshToken) {
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
                        reject(response);
                    }
                })
                .then((token) => {
                    setAccessToken(token["access"]);
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            reject("No Refresh Token");
        }
    });
};
const checkAccessToken = () => {
    const accessToken = getAccessToken();
    return new Promise((resolve, reject) => {
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
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            reject("No Access Token");
        }
    });
};
const checkToken = () => {
    return new Promise((resolve, reject) => {
        checkAccessToken()
            .then(() => {
                console.log("access token is still valid")
                resolve(true);
            })
            .catch(() => {
                refreshAccessToken()
                    .then(() => {
                        console.log("refresh token got us a new access token")
                        resolve(true);
                    })
                    .catch((error) => {
                        // if we get here, then refresh token is  invalid as well
                        console.log("refresh token is invalid")
                        reject(error);
                    });
            });
    });
};


// RESET
const resetLocalStorage = () => {
    localStorage.removeItem(userKey);
    localStorage.removeItem(isAuthKey);
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
};


// AUTH FUNCTIONS
const login = (data) => {
    return new Promise((resolve, reject) => {
        setIsAuth(false);
        fetch(loginURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response);
                }
            })
            .then((user) => {
                if ("message" in user) {
                    // user have to verify email
                    resolve(false);
                } else {
                    const token = user['token'];
                    setAccessToken(token['access']);
                    setRefreshToken(token['refresh']);
                    delete user['token'];
                    setIsAuth(true);
                    setUser(user);
                    resolve(true);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const logout = () => {
    return new Promise((resolve, reject) => {
        checkToken()
            .then(() => {
                const accessToken = getAccessToken();
                const refreshToken = getRefreshToken();
                setIsAuth(false);
                resetLocalStorage();
                fetch(logoutURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        refresh: refreshToken,
                    }),
                })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch(() => {
                setIsAuth(false);
                resetLocalStorage();
                reject("logout");
            })
    });
};

const register = (data) => {
    return new Promise((resolve, reject) => {
        setIsAuth(false);
        fetch(registerURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    });
};

const emailVerification = (id, token) => {
    return new Promise((resolve, reject) => {
        setIsAuth(false);
        fetch(`${emailVerificationURL}${id}/${token}/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response);
                }
            })
            .then((user) => {
                const token = user['token'];
                setAccessToken(token['access']);
                setRefreshToken(token['refresh']);
                delete user['token'];
                setIsAuth(true);
                setUser(user);
                resolve(true);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const changePassword = (oldPassword, newPassword, confirmNewPassword) => {
    return new Promise((resolve, reject) => {
        checkToken()
            .then(() => {
                const accessToken = getAccessToken();
                fetch(passwordChangeURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        "old_password": oldPassword,
                        "new_password": newPassword,
                        "confirm_new_password": confirmNewPassword
                    }),
                })
                    .then((response) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch(() => reject("logout"));
    });
};

const resetPasswordEmail = (data) => {
    return new Promise((resolve, reject) => {
        fetch(resetPasswordEmailURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => {
                if (response.ok) {
                    resolve(true);
                } else {
                    reject(response);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const resetPassword = (id, token, data) => {
    return new Promise((resolve, reject) => {
        fetch(`${resetPasswordURL}${id}/${token}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => {
                if (response.ok) {
                    resolve(true);
                } else {
                    reject(response);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const fetchUser = () => {
    return new Promise((resolve, reject) => {
        checkToken()
            .then(() => {
                const accessToken = getAccessToken();
                fetch(userURL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            reject(response);
                        }
                    })
                    .then((user) => {
                        setUser(user);
                        resolve(true);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch(() => reject("logout"));
    });
};

const updateUser = (data) => {
    return new Promise((resolve, reject) => {
        checkToken()
            .then(() => {
                const accessToken = getAccessToken();
                fetch(userUpdateURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: data,
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            reject(response);
                        }
                    })
                    .then((user) => {
                        setUser(user)
                        resolve(true);
                      })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch(() => reject("logout"));
    });
};

export const authService = {
    // USER
    getUser,
    getUserSubscriber,
    //AUTH
    setIsAuth,
    getIsAuth,
    getAuthSubscriber,
    //TOKEN
    getAccessToken,
    getRefreshToken,
    checkToken,
    // AUTH FUNCTIONS
    login,
    logout,
    register,
    emailVerification,
    changePassword,
    resetPasswordEmail,
    resetPassword,
    fetchUser,
    updateUser,
}