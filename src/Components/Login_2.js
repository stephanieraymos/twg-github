import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useGlobalContext } from "../context";
import modalandsidebar from "../css/modalandsidebar.css";

import logo from "../img/w-logo.png";
import { Link } from "react-router-dom";

const LoginModal = () => {
    const url = "https://api.thewholesalegroup.com/v1/account/login/";

    const [width, setWidth] = useState(window.innerWidth);
    const [openSignUp, setOpenSignUp] = useState(false);

    const { isModalOpen, closeModal } = useGlobalContext();

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
    })

    //* useEffect for user post request
    const login = () => {
        console.log("login is running");
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    throw new Error("One or more of the required keys are missing.");
                } else if (response.status == 404) {
                    throw new Error(
                        "The user does not exist or email/password is incorrect."
                    );
                }
            })
            .then((user) => {
                closeModal();
                setUserId(user["id"]);
                setEmail(user["email"]);
                setFirstName(user["first_name"]);
                setLastName(user["last_name"]);
                setCompany(user["company"]);
                setPhoneNumber(user["phone_number"]);
                setBillingAddress(user["billing_address"]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {width < 1000 ? (
                <div className="auth-container">
                    <img src={logo} alt="logo image" style={{width: "200px", backgroundColor: "#13131f"}}/>
                    <h1 className="form-header" style={{width: "90%", color: "white", textShadow: "none", textAlign: "center", fontSize: "48px"}}>The Wholesale Group</h1>
    
                    <div className="auth-form-container">
                        <Form onSubmit={handleSubmit} style={{width: "85%", margin: "5% auto"}}>
                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                />
                            </Form.Group>
        
                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </Form.Group>
        
                            <Button type="submit" onClick={login} className="auth-form-button" block style={{backgroundColor: "#f47c20"}}>
                                Login
                            </Button>
        
                            <div className="auth-footer-container">
                                <Link to={`/Login`} className="auth-form-label" style={{color: "#f47c20"}}>
                                    Forgot Password?
                                </Link>
        
                                <hr style={{width: "100%", height: "1px", backgroundColor: "gray", opacity: "25%"}} />
        
                                <Button type="submit" onClick={login} className="auth-form-button" block style={{width: "200px", backgroundColor: "#1f85b4", margin: "1rem auto"}}>
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
                        <Form onSubmit={handleSubmit} style={{ width: "85%", margin: "5% auto" }}>
                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                />
                            </Form.Group>

                            <Form.Group className="center-form-group">
                                <Form.Label className="auth-form-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button type="submit" onClick={login} className="auth-form-button" block style={{ backgroundColor: "#f47c20" }}>
                                Login
                        </Button>

                            <div className="auth-footer-container">
                                <Link to={`/Login`} className="auth-form-label" style={{ color: "#f47c20" }}>
                                    Forgot Password?
                            </Link>

                                <hr style={{ width: "100%", height: "1px", backgroundColor: "gray", opacity: "25%" }} />

                                <Button type="submit" onClick={login} className="auth-form-button" block style={{ width: "200px", backgroundColor: "#1f85b4", margin: "1rem auto" }}>
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
