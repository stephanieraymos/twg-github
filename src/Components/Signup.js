import React, { useState } from "react";
import Navigation from "./Navigation";
import { useGlobalContext } from "../context";
import { useTruckContext } from "../truckContext";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const url = "https://api.thewholesalegroup.com/api/v1/account/register/";
const id = uuidv4();

const url = "http://143.110.225.28/v1/account/register/"

const Signup = () => {
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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!firstName || lastName || !email) {
      showAlert(true, "danger", "Please enter value");
    } else {
      //* Show alert and add user to inventory only if name is true and not editing
      showAlert(true, "success", "Truck Added");

      //* Creating new user
      const newUser = {
        id: id,
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
      <div>
        <Navigation />
      </div>
      <div>
        <h1 className="form-header">Sign up</h1>
        <Form onSubmit={handleSignupSubmit} style={{width: "25%", margin: "0 auto"}}>
            <Form.Group className="center-form-group">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>

              <Button type="submit" onClick={signUp} className="boot-button" block style={{width: "10rem", margin: "2rem auto"}}>
                Sign up
              </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
