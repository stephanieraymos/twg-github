import React, { useRef, useState } from "react";
import { Button, Form, InputGroup, Image } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import visibleOn from "../../img/visibility-on.svg";
import visibleOff from "../../img/visibility-off.svg";
import { useGlobalContext } from "../../context";
import { useAuthContext } from "../../auth";
import users from "../../css/users.css";
import ResetPasswordModal from "../Users/ResetPasswordModal";
// import { toggleModal } from "toggle-modal";

const FormLogin = () => {
  const form = useRef(null);
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(
    false
  );
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const { login } = useAuthContext();

  const {
    email,
    setEmail,
    setFirstName,
    setLastName,
    setCompany,
    setPhoneNumber,
    setBillingAddress,
    setIsSignUpSuccess,
    openModal,
  } = useGlobalContext();

  let history = useHistory();
  let location = useLocation();

  const resetValues = () => {
    setPassword("");
    setTogglePasswordVisibility(false);
    setValidated(false);
    setIsLoginIncorrect(false);
  };

  const openResetModal = () => {
    console.log("openResetModal triggered");
    setIsResetModalOpen(true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      // no errors
      performLogin();
    }
  };

  const performLogin = () => {
    const data = new FormData(form.current);
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    login(JSON.stringify(object))
      .then((user) => {
        resetValues();
        if (typeof user === "string") {
          // user needs to verify email
          // toggleModal.openModal();
          openModal();
          setIsSignUpSuccess(true);
        } else {
          setEmail(user["email"]);
          setFirstName(user["first_name"]);
          setLastName(user["last_name"]);
          setCompany(user["company"]);
          setPhoneNumber(user["phone_number"]);
          setBillingAddress(user["billing_address"]);
          let { from } = location.state || { from: { pathname: "/" } };
          history.replace(from);
        }
      })
      .catch((error) => {
        console.log(error);
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

          <button
            type="button"
            onClick={openResetModal}
            className="forgot-password-button"
            style={{ color: "#f47c20" }}
          >
            Forgot Password?
          </button>

          <ResetPasswordModal
            isResetModalOpen={isResetModalOpen}
            setIsResetModalOpen={setIsResetModalOpen}
          />

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

// @todo If I add () to end of openResetModal in Form login line 167; it says cannot read property "preventDefault" of undefined.
export default FormLogin;
