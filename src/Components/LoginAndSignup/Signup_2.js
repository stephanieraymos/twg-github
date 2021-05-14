import React, { useState, useRef } from "react";
import { useGlobalContext } from "../../context/context";
import { Button, Modal, Form, InputGroup, Image } from "react-bootstrap";
import cancel from "../../img/cancel.svg";
import mail from "../../img/mail.svg";
import visibleOn from "../../img/visibility-on.svg";
import visibleOff from "../../img/visibility-off.svg";
import { authService } from "../../authService";

const Signup2 = () => {
  document.title = "Sign up";

  const { isModalOpen, closeModal } = useGlobalContext();
  const [validated, setValidated] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(
    false
  );

  const {
    isSignUpSuccess,
    setIsSignUpSuccess
  } = useGlobalContext();

  const form = useRef(null);

  const resetValues = () => {
    setPassword("");
    setConfirmPassword("");
    setTogglePasswordVisibility(false);
    setValidated(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    const allErrors = {};

    /*
    The password must be at least 8 characters and contains
      - at least 1 lowercase character,
      - at least 1 uppercase character, and
      - at least 1 numeric character
    */
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );

    if (!strongRegex.test(password)) {
      allErrors.password = true;
    }

    if (password !== confirmPassword) {
      allErrors.confirmPassword = true;
    }

    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      // there's errors
      setValidated(false);
    } else if (form.checkValidity() === true) {
      // no errors
      setValidated(true);
      performSignUp();
    } else {
      // no password or confirm password errors but errors in other fields
      setValidated(true);
    }
  };

  //* useEffect for user post request
  const performSignUp = () => {
    const data = new FormData(form.current);
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    authService.register(JSON.stringify(object))
      .then(() => {
        setIsSignUpSuccess(true);
        resetValues();
      })
      .catch((error) => {
        console.log("Sign Up Error:", error.json());
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
                <img
                  src={cancel}
                  alt="cancel"
                  onClick={() => {
                    setIsSignUpSuccess(false);
                    closeModal();
                  }}
                />
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
              ref={form}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              style={{ width: "85%", margin: "0% 5% 5%" }}
            >
              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" required name="email" />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" required name="username" />
                <Form.Control.Feedback type="invalid">
                  That username is not available, please choose another.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control type="text" required name="first_name" />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control type="text" required name="last_name" />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type={togglePasswordVisibility ? "text" : "password"}
                    required
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
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
                    Your password does not meet the requirements.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text muted>Password Requirements:</Form.Text>
                <Form.Text muted>* 8 characters or longer</Form.Text>
                <Form.Text muted>* 1 or more lowercase characters</Form.Text>
                <Form.Text muted>* 1 or more uppercase character</Form.Text>
                <Form.Text muted>* 1 or more numeric character</Form.Text>
              </Form.Group>

              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  name="confirm_password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  Your confirm password doesn't match your password.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form-footer-container">
                <Button
                  type="submit"
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
