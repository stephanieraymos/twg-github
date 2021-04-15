import React, { useRef, useState } from "react";
import { useAuthContext } from "../../auth";
import { Form, Button, Image, InputGroup } from "react-bootstrap";
import visibleOn from "../../img/visibility-on.svg";
import visibleOff from "../../img/visibility-off.svg";

const ResetPasswordPage = () => {
  const finalResetForm = useRef(null);
  const [validated, setValidated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(
    false
  );
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword } = useAuthContext();

  const handleFinalResetSubmit = () => {
    const data = new FormData(finalResetForm.current);
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    resetPassword(JSON.stringify(object))
      .then(() => {
        // success
        setCurrentPassword(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form
        ref={finalResetForm}
        noValidate
        validated={validated}
        onSubmit={handleFinalResetSubmit}
      >
        <Form.Group className="center-form-group">
          <Form.Label className="form-label">New Password</Form.Label>
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
          <Form.Label className="form-label">Confirm New Password</Form.Label>
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
        <Button
          type="submit"
          className="form-button"
          block
          style={{
            width: "200px",
            backgroundColor: "#1f85b4",
            marginBottom: "0.5rem",
          }}
        >
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
