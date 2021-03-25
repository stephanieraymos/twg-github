import React, { useState } from "react";
import Navigation from "./Navigation";
import { useGlobalContext } from "../context";
import { useTruckContext } from "../truckContext";
import { Button, Modal, Form } from "react-bootstrap";
import logo from "../img/w-logo.png";
import { Link } from "react-router-dom";

const url = "https://api.thewholesalegroup.com/v1/account/register/";

const Signup2 = () => {
  document.title = "Sign up";

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    error,
    setError,
    setUserId,
    postToDb,
    closeModal
  } = useGlobalContext();

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const {
    showAlert
  } = useTruckContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || lastName || !email) {
      showAlert(true, "danger", "Please enter value");
    } else {
      //* Show alert and add user to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");

      //* Creating new user
      const newUser = {
        firstName,
        lastName,
        email,
      };

      console.log("Sign up successful");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  //* useEffect for user post request
  const signUp = () => {
    console.log("signup is running")
    fetch(url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email : email,
            password : password,
            confirm_password : confirmPassword,
            first_name : firstName,
            last_name : lastName
        }),
      }
    )
    .then((response) => {
      if (response.ok) {
        // redirect to the email verification page basically telling them to check their email and click on the link
      } else if (response.status == 400){
        throw new Error("One or more of the data types are wrong or one or more of the required keys are missing.");
      }
    })
    .catch((error) => {
      console.log(error)
    });
  };

  return (
    <>
        <div className="auth-container">
            <div className="auth-logo-container">
                <img src={logo} alt="logo image" style={{width: "30%", backgroundColor: "#13131f"}}/>
                <h1 className="form-header" style={{color: "white", textShadow: "none", textAlign: "center"}}>The Wholesale Group</h1>
            </div>
            <div className="auth-form-container">
                <h1 className="form-header" style={{color: "white", textShadow: "none"}}>Sign Up</h1>
                <Form onSubmit={handleSubmit} style={{width: "70%", margin: "0 auto"}}>
                    <Form.Group className="center-form-group">
                        <Form.Label className="auth-form-label">First Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                    </Form.Group>

                    <Form.Group className="center-form-group">
                        <Form.Label className="auth-form-label">Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                    </Form.Group>
                    
                    <Form.Group className="center-form-group">
                        <Form.Label className="auth-form-label">Email</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
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
                    
                    <Form.Group className="center-form-group">
                        <Form.Label className="auth-form-label">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                    </Form.Group>

                    <div className="auth-footer-container">
                        <Button type="submit" onClick={signUp} className="auth-form-button" block style={{width: "10rem", margin: "2rem auto"}}>
                            Sign up
                        </Button>

                        <Link
                            to={`/Login`}
                            className="auth-form-label"
                            >
                            Already have an account? Login Here
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    </>
  );
};

export default Signup2;
