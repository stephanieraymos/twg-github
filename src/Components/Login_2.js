import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useGlobalContext } from "../context";
import modalandsidebar from "../css/modalandsidebar.css";

import logo from "../img/w-logo.png";
import { Link, useHistory } from "react-router-dom";
import Signup2 from "./Signup_2";

import { useAuthContext } from "../auth";

const LoginModal = () => {
  const url = "https://api.thewholesalegroup.com/v1/account/login/";

  const [width, setWidth] = useState(window.innerWidth);

  let history = useHistory();

  const { openModal } = useGlobalContext();

  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  // const [emailInput, setEmailInput] = useState("");
  // const [passwordInput, setPasswordInput] = useState("");
  const passwordInput = useRef("");
  const emailInput = useRef("");
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
    setCookie,
  } = useGlobalContext();

  const {
    accessToken: [accessToken, setAccessToken],
    refreshToken: [refreshToken, setRefreshToken],
    authenticate,
    removeToken,
  } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert(true, "danger", "Please enter value");
    }
    // if (password != passwordInput) {
    //   showAlert(
    //     true,
    //     "danger",
    //     "The password you entered does not match the password on file"
    //   );
    // }
    // if (email != emailInput) {
    //   showAlert(
    //     true,
    //     "danger",
    //     "The email address you entered does not match our records"
    //   );
    // }
    if(email != emailInput.value) {
      console.log("Wrong Email")
    }
    else {
      // Show alert and add person to person list only if name is true and not editing
      showAlert(true, "success", "Login Successful");

      setPassword("");
    }
  };

  //showAlert function, when called the values for each param are passed in as arguments
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  useEffect(() => {
    authenticate(() => {
      history.push("/dashboard");
    }, []);

    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // clean up code
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      .then(() => history.push("/Dashboard"))
      .catch((error) => {
        showAlert(true, "danger", error.message);
      });
  };

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
            <Form
              onSubmit={handleSubmit}
              style={{ width: "85%", margin: "5%" }}
            >
              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  ref={emailInput}
                  type="email"
                  required
                  value={email}
                  // value={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                  // onChange={(e) => setEmailInput(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  // value={passwordInput}
                  onChange={(e) => setPassword(e.target.value)}
                  // onChange={(e) => setPasswordInput(e.target.value)}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>

              <div className="form-footer-container">
                <Button
                  type="submit"
                  onClick={login}
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
                  type="submit"
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
            </Form>
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
            <Form
              onSubmit={handleSubmit}
              style={{ width: "85%", margin: "5%" }}
            >
              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="form-footer-container">
                <Button
                  type="submit"
                  onClick={login}
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
                  type="submit"
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
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

// TP-42
