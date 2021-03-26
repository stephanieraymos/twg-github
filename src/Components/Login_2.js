import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useGlobalContext } from "../context";
import modalandsidebar from "../css/modalandsidebar.css";

import logo from "../img/w-logo.png";
import { Link, useHistory } from "react-router-dom";
import SignUp from "./Signup_2";
import Signup2 from "./Signup_2";

const LoginModal = () => {
    const url = "https://api.thewholesalegroup.com/v1/account/login/";

    const [width, setWidth] = useState(window.innerWidth);

    let history = useHistory();

    const {
        openModal, 
    } = useGlobalContext();

    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const {
        setUserId,
        email,
        setEmail,
        setFirstName,
        setLastName,
        setCompany,
        setPhoneNumber,
        setBillingAddress,
        cookies,
        setCookie
    } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            showAlert(true, "danger", "Please enter value");
        } else {
            // Show alert and add person to person list only if name is true and not editing
            showAlert(true, "success", "Person Added");

            setPassword("");
        }
    };

    //showAlert function, when called the values for each param are passed in as arguments
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)

        // clean up code
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {
        const tokenVerifyURL = "https://api.thewholesalegroup.com/v1/account/token/verify/";
        fetch(tokenVerifyURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: cookies["user-access-token"]
            }),
        })
        .then((response) => {
            if (response.ok) {
                // user has already logged in
                history.push("/Dashboard")
            } else {
                const tokenRefreshURL = "https://api.thewholesalegroup.com/v1/account/token/refresh/";
                // user might have a refresh token that have not expired yet
                fetch(tokenRefreshURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        refresh: cookies["user-refresh-token"]
                    }),
                })
                .then((response) => {
                    if (response.ok) {
                        // user is logged in again
                        const user = response.json()
                        setCookie("user-access-token", user["access"], {
                            path: "/",
                            // secure: true,
                            maxAge: 3600    // 1 hour
                        });
                        history.push("/Dashboard")
                    }
                })
            }
        })
        .catch((error) => {
            showAlert(true, "danger", error.message);
        });
    });

    //* useEffect for user post request
    const login = () => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                const res = response.json()
                if (response.ok) {
                    return res;
                } else {
                    throw new Error(res.message);
                }
            })
            .then((user) => {
                setUserId(user["id"]);
                setEmail(user["email"]);
                setFirstName(user["first_name"]);
                setLastName(user["last_name"]);
                setCompany(user["company"]);
                setPhoneNumber(user["phone_number"]);
                setBillingAddress(user["billing_address"]);
                setCookie("user-access-token", user["token"]["access"], {
                    path: "/",
                    // secure: true,
                    maxAge: 3600    // 1 hour
                });
                setCookie("user-refresh-token", user["token"]["refresh"], {
                    path: "/",
                    // secure: true,
                    maxAge: 604800  // 7 days
                });
            })
            .then(() => history.push("/Dashboard"))
            .catch((error) => {
                showAlert(true, "danger", error.message);
            });
    };

    return (
        <>
            <Signup2 />
            {width < 1000 ? (
                <div className="auth-container">
                    <img src={logo} alt="logo image" style={{width: "200px", backgroundColor: "#13131f"}}/>
                    <h1 className="form-header" style={{width: "90%", color: "white", textShadow: "none", textAlign: "center", fontSize: "48px"}}>The Wholesale Group</h1>
    
                    <div className="auth-form-container">
                        <Form onSubmit={handleSubmit} style={{width: "85%", margin: "5%"}}>
                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
        
                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
        
                            <div className="auth-footer-container">
                                <Button type="submit" onClick={login} className="auth-form-button" block style={{width: "100%", backgroundColor: "#f47c20"}}>
                                    Login
                                </Button>

                                <Link to={`/Login`} className="auth-form-label" style={{color: "#f47c20"}}>
                                    Forgot Password?
                                </Link>
        
                                <hr style={{width: "100%", height: "1px", backgroundColor: "gray", opacity: "25%"}} />
        
                                <Button type="submit" onClick={openModal} className="auth-form-button" block style={{width: "200px", backgroundColor: "#1f85b4", marginBottom: "0.5rem"}}>
                                    Create an account
                                </Button>
                            </div>
                        </Form>
                    </div>
               </div>
            ) : (
                <div className="auth-container" style={{ flexDirection: "row" }}>
                    <div className="auth-logo-container">
                        <img src={logo} alt="logo image" style={{ width: "200px", backgroundColor: "#13131f" }} />
                        <h1 className="form-header" style={{ width: "90%", color: "white", textShadow: "none", textAlign: "center", fontSize: "48px" }}>The Wholesale Group</h1>
                    </div>
                    <div className="auth-form-container">
                        <Form onSubmit={handleSubmit} style={{ width: "85%", margin: "5%" }}>
                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="auth-footer-container">
                                <Button type="submit" onClick={login} className="auth-form-button" block style={{width: "100%", backgroundColor: "#f47c20"}}>
                                    Login
                                </Button>

                                <Link to={`/Login`} className="auth-form-label" style={{color: "#f47c20"}}>
                                    Forgot Password?
                                </Link>
        
                                <hr style={{width: "100%", height: "1px", backgroundColor: "gray", opacity: "25%"}} />
        
                                <Button type="submit" onClick={openModal} className="auth-form-button" block style={{width: "200px", backgroundColor: "#1f85b4", marginBottom: "0.5rem"}}>
                                    Create an account
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginModal;

// TP-42
