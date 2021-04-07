import React, { useState, useEffect } from "react";
import Loading from "../Pages/Loading";
import { useGlobalContext } from "../context";
import { Button, Form, Row, Col } from "react-bootstrap";
import { getByIdURL, userURL } from "../Pages/urls";

const AccountDetails = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  document.title = "Account Details";

  const {
    userId,
    setUserId,
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
    cookies,
  } = useGlobalContext();

  const getUserDetails = () => {
    fetch(userURL, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + cookies["user-access-token"],
      },
    })
      .then((response) => {
        const res = response.json()
        console.log(res)
        if (response.ok) {
          console.log("ok")
          setUserId(res["id"]);
          setEmail(res["email"]);
          setFirstName(res["first_name"]);
          setLastName(res["last_name"]);
          setCompany(res["company"]);
          setPhoneNumber(res["phone_number"]);
          setBillingAddress(res["billing_address"]);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            className="form-label"
            style={{ width: "85%", color: "black", fontSize: "36px", margin: "24px auto" }}
          >
            Account
          </div>

          <Form
            onSubmit={null}
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
                    />
                  ) : (
                    <Form.Control
                      type="email"
                      readOnly
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      readOnly
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      readOnly
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      readOnly
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
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
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      readOnly
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      readOnly
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                    />
                  )
                }
              </Col>

            </Form.Group>

            <div className="form-footer-container">
              <Button
                type="submit"
                onClick={null}
                className="form-button"
                block
                style={{ width: "150px", backgroundColor: "#f47c20", alignSelf: "start", margin: "1rem 0rem" }}
              >
                Edit Profile
            </Button>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>

            </Form.Group>

            <Form.Group as={Row} className="center-form-group">
              <Form.Label column sm={4} className="form-label">New Password</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>

            </Form.Group>

            <Form.Group as={Row} className="center-form-group">
              <Form.Label column sm={4} className="form-label">Confirm New Password</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>

            </Form.Group>

            <div className="form-footer-container">
              <Button
                type="submit"
                onClick={null}
                className="form-button"
                block
                style={{ width: "200px", backgroundColor: "#1f85b4", alignSelf: "start", margin: "1rem 0rem" }}
              >
                Change Password
            </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default AccountDetails;

// TP-52
