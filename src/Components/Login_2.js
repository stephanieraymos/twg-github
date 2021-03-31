import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Modal, Form, InputGroup, Image } from "react-bootstrap";
import { useGlobalContext } from "../context";
import modalandsidebar from "../css/modalandsidebar.css";

import logo from "../img/w-logo.png";
import { Link, useHistory } from "react-router-dom";
import SignUp from "./Signup_2";
import Signup2 from "./Signup_2";

import { useAuthContext } from "../auth";
import visibleOn from "../img/visibility-on.svg";
import visibleOff from "../img/visibility-off.svg";
import { cleanup } from "@testing-library/react";

const LoginModal = () => {
  const url = "https://api.thewholesalegroup.com/v1/account/login/";

  const [width, setWidth] = useState(window.innerWidth);
  const [validated, setValidated] = useState(false);
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false)

  const form = useRef(null);

  let history = useHistory();

  const { openModal } = useGlobalContext();

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

  const {
    accessToken: [accessToken, setAccessToken],
    refreshToken: [refreshToken, setRefreshToken],
    authenticate,
  } = useAuthContext();

  const reset = () => {
    setPassword("");
    setTogglePasswordVisibility(false);
    setValidated(false);
    setIsLoginIncorrect(false);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      // no errors
      login(reset)
    }
  };

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  useEffect(() => {

    authenticate(() => {
      history.push("/dashboard");
    });

    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // clean up code
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //* useEffect for user post request
  const login = (cleanUp=() => {}) => {
    const data = new FormData(form.current);
    var object = {};
    data.forEach((value, key) => object[key] = value);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
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
        setEmail(user["email"]);
        setFirstName(user["first_name"]);
        setLastName(user["last_name"]);
        setCompany(user["company"]);
        setPhoneNumber(user["phone_number"]);
        setBillingAddress(user["billing_address"]);
        setAccessToken(user["token"]["access"]);
        setRefreshToken(user["token"]["refresh"]);
      })
      .then(() => {
        cleanUp();
        history.push("/dashboard");
      })
      .catch((error) => {
        setIsLoginIncorrect(true);
        setValidated(false);
      });
  };

  const LoginForm = 
    <Form
      ref={form}
      noValidate 
      validated={validated}
      onSubmit={handleSubmit}
      style={{ width: "85%", margin: "5%" }}
    >
      <Form.Group className="center-form-group">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="center-form-group">
        <Form.Label className="form-label">Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type={togglePasswordVisibility ? "text" : "password"}
            required
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputGroup.Append>
            <Image 
              src={togglePasswordVisibility ? visibleOn : visibleOff}
              thumbnail 
              style={{cursor: "pointer"}}
              onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}/>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {
        isLoginIncorrect && 
        <Form.Group className="center-form-group">
          <Form.Text className="form-label" style={{color: "red", textAlign: "center"}}>
            Your email or password is incorrect.
          </Form.Text>
        </Form.Group>
      }
      
      <div className="form-footer-container">
        <Button
          type="submit"
          className="form-button"
          block
          style={{ width: "100%", backgroundColor: "#f47c20" }}
        >
          Login
        </Button>

        <Link
          to={`/Login`}
          className="form-label"
          style={{ color: "#f47c20" }}
        >
          Forgot Password?
        </Link>

        <hr
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "gray",
            opacity: "25%",
          }}
        />

        <Button
          type="button"
          onClick={openModal}
          className="form-button"
          block
          style={{
            width: "200px",
            backgroundColor: "#1f85b4",
            marginBottom: "0.5rem",
          }}
        >
          Create an account
        </Button>
      </div>
    </Form>;
    

  return (
    <>
      <Signup2 />
      {width < 1000 ? (
        <div className="form-container">
          <img
            src={logo}
            alt="logo image"
            style={{ width: "200px", backgroundColor: "#13131f" }}
          />
          <h1
            className="form-header"
            style={{
              width: "90%",
              color: "white",
              textShadow: "none",
              textAlign: "center",
              fontSize: "48px",
            }}
          >
            The Wholesale Group
          </h1>

          <div className="form-body-container">
            {LoginForm}
          </div>
        </div>
      ) : (
        <div className="form-container" style={{ flexDirection: "row" }}>
          <div className="form-header-container">
            <img
              src={logo}
              alt="logo image"
              style={{ width: "200px", backgroundColor: "#13131f" }}
            />
            <h1
              className="form-header"
              style={{
                width: "90%",
                color: "white",
                textShadow: "none",
                textAlign: "center",
                fontSize: "48px",
              }}
            >
              The Wholesale Group
            </h1>
          </div>
          <div className="form-body-container">
            {LoginForm}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

// TP-42
