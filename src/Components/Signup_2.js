import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { useTruckContext } from "../truckContext";
import { Button, Modal, Form } from "react-bootstrap";
import cancel from "../img/cancel.svg";
import mail from "../img/mail.svg";

const url = "https://api.thewholesalegroup.com/v1/account/register/";

const Signup2 = () => {
  document.title = "Sign up";

  const { error, setError, isModalOpen, closeModal } = useGlobalContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const { showAlert } = useTruckContext();

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

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  //* useEffect for user post request
  const signUp = () => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        confirm_password: confirmPassword,
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then((response) => {
        const res = response.json();
        if (response.ok) {
          setIsSignUpSuccess(true);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        showAlert(true, "danger", error.message);
      });
  };

  return (
    <>
      {isSignUpSuccess ? (
        <Modal
          show={isModalOpen}
          onHide={closeModal}
          backdrop="static"
          centered
        >
          <div
            className="form-body-container"
            style={{ width: "90%", alignSelf: "center" }}
          >
            <div
              className="form-header-container"
              style={{
                width: "85%",
                flexDirection: "row",
                justifyContent: "flex-end",
                margin: "1rem 1rem 0rem",
              }}
            >
              <button
                style={{
                  background: "transparent",
                  borderColor: "transparent",
                }}
              >
                <img src={cancel} alt="cancel" onClick={closeModal} />
              </button>
            </div>

            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "gray",
                opacity: "25%",
              }}
            />

            <img src={mail} alt="logo image" style={{ width: "100px" }} />
            <div
              className="form-label"
              style={{
                color: "black",
                fontSize: "24px",
                textAlign: "center",
                margin: "0% 5% 5%",
              }}
            >
              Please check your email for a verification link to complete the
              registration process.
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          show={isModalOpen}
          onHide={closeModal}
          backdrop="static"
          centered
        >
          <div
            className="form-body-container"
            style={{ width: "90%", alignSelf: "center" }}
          >
            <div
              className="form-header-container"
              style={{
                width: "85%",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "1rem 1rem 0rem",
              }}
            >
              <div
                className="form-label"
                style={{ color: "black", fontSize: "36px" }}
              >
                Sign Up
              </div>
              <button
                style={{
                  background: "transparent",
                  borderColor: "transparent",
                }}
              >
                <img src={cancel} alt="cancel" onClick={closeModal} />
              </button>
            </div>

            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "gray",
                opacity: "25%",
              }}
            />

            <Form
              onSubmit={handleSubmit}
              style={{ width: "85%", margin: "0% 5% 5%" }}
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
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <div className="form-footer-container">
                <Button
                  type="submit"
                  onClick={signUp}
                  className="form-button"
                  block
                  style={{ width: "100%", backgroundColor: "#f47c20" }}
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Signup2;
