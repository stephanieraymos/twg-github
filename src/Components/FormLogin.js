import React, { useRef, useState, useEffect } from "react";
import { Button, Form, InputGroup, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import visibleOn from "../img/visibility-on.svg";
import visibleOff from "../img/visibility-off.svg";
import { cleanup } from "@testing-library/react";
import { useGlobalContext } from "../context";
import { useAuthContext } from "../auth";

const FormLogin = () => {
  const url = "https://api.thewholesalegroup.com/v1/account/login/";

  const form = useRef(null);
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(
    false
  );
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false);

  const {
    setAccessToken,
    setRefreshToken,
    fetchAccessToken,
  } = useAuthContext();

  const {
    setUserId,
    email,
    setEmail,
    setFirstName,
    setLastName,
    setCompany,
    setPhoneNumber,
    setBillingAddress,
    openModal,
  } = useGlobalContext();

  let history = useHistory();

  const reset = () => {
    setPassword("");
    setTogglePasswordVisibility(false);
    setValidated(false);
    setIsLoginIncorrect(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      // no errors
      login(reset);
    }
  };

  //* useEffect for user post request
  const login = (cleanUp = () => {}) => {
    const data = new FormData(form.current);
    var object = {};
    data.forEach((value, key) => (object[key] = value));
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

  return (
    <>
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
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setTogglePasswordVisibility(!togglePasswordVisibility)
                }
              />
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {isLoginIncorrect && (
          <Form.Group className="center-form-group">
            <Form.Text
              className="form-label"
              style={{ color: "red", textAlign: "center" }}
            >
              Your email or password is incorrect.
            </Form.Text>
          </Form.Group>
        )}

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
      </Form>
    </>
  );
};

export default FormLogin;
