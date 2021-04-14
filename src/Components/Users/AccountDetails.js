import React, { useState, useEffect, useRef } from "react";
import Loading from "../../Pages/Loading";
import { useGlobalContext } from "../../context";
import { useAuthContext } from "../../auth";
import { Button, Form, Row, Col } from "react-bootstrap";
import { userURL } from "../../Pages/urls";
import Navigation from "../Navigation/Navigation";

const AccountDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const form = useRef(null);

  document.title = "Account Details";

  const { accessToken, changePassword, updateUser } = useAuthContext();

  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    phoneNumber,
    setPhoneNumber,
    billingAddress,
    setBillingAddress,
    getUser,
  } = useGlobalContext();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const performUserUpdate = () => {
    const data = new FormData(form.current);
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    updateUser(JSON.stringify(object))
      .then((user) => {
        setEmail(user["email"]);
        setFirstName(user["first_name"]);
        setLastName(user["last_name"]);
        setCompany(user["company"]);
        setPhoneNumber(user["phone_number"]);
        setBillingAddress(user["billing_address"]);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUser(accessToken());
  }, []);

  return (
    <>
      <div>
        <Navigation />
      </div>
        
      <div className="account-details-wrapper">
        <div
          className="form-label"
          style={{ width: "85%", color: "black", fontSize: "36px", margin: "24px auto" }}
        >
          {firstName}'s Account
        </div>

        <Form
          ref={form}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          style={{ width: "85%", margin: "24px auto" }}
        >
          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Email</Form.Label>
            <Col sm={8}>
              {
                isEditing ? (
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                ) : (
                  <Form.Control
                    type="email"
                    readOnly
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                )
              }
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">First Name</Form.Label>
            <Col sm={8}>
              {
                isEditing ? (
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="first_name"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    readOnly
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="first_name"
                  />
                )
              }
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Last Name</Form.Label>
            <Col sm={8}>
              {
                isEditing ? (
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    name="last_name"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    readOnly
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    name="last_name"
                  />
                )
              }
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Company</Form.Label>
            <Col sm={8}>
              {
                isEditing ? (
                  <Form.Control
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    name="company"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    readOnly
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    name="company"
                  />
                )
              }
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Phone Number</Form.Label>
            <Col sm={8}>
              {
                isEditing ? (
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="phone_number"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    readOnly
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="phone_number"
                  />
                )
              }
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Billing Address</Form.Label>
            <Col sm={8}>
              {
                isEditing ? (
                  <Form.Control
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    name="billing_address"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    readOnly
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    name="billing_address"
                  />
                )
              }
            </Col>

          </Form.Group>

          <div className="form-footer-container">
            {
              isEditing ? (
                <Button
                  type="button"
                  onClick={() =>  performUserUpdate()}
                  className="form-button"
                  block
                  style={{ width: "150px", backgroundColor: "#f47c20", alignSelf: "start", margin: "1rem 0rem" }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() =>  setIsEditing(!isEditing)}
                  className="form-button"
                  block
                  style={{ width: "150px", backgroundColor: "#f47c20", alignSelf: "start", margin: "1rem 0rem" }}
                >
                  Edit Profile
                </Button>
              )
            }
          </div>
        </Form>

        <hr
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "gray",
            opacity: "25%",
          }}
        />

        <Form
          onSubmit={null}
          style={{ width: "85%", margin: "24px auto" }}
        >
          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Current Password</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">New Password</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="center-form-group">
            <Form.Label column sm={4} className="form-label">Confirm New Password</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Col>

          </Form.Group>

          <div className="form-footer-container">
            <Button
              type="button"
              onClick={() => {
                changePassword(currentPassword, newPassword, confirmNewPassword)
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
              }}
              className="form-button"
              block
              style={{ width: "200px", backgroundColor: "#1f85b4", alignSelf: "start", margin: "1rem 0rem" }}
            >
              Change Password
          </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AccountDetails;

// TP-52
