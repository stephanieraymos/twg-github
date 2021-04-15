import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import cancel from "../../img/cancel.svg";
import { useGlobalContext } from "../../context";
import { useAuthContext } from "../../auth";
import mail from "../../img/mail.svg";

//Values from FormLogin:
const ResetPasswordModal = ({
  validated,
  currentPassword,
  isResetModalOpen,
  setIsResetModalOpen,
}) => {
  document.title = "Reset Password";

  const resetForm = useRef(null);

  const {
    isModalOpen,
    isResetEmailSuccess,
    setIsResetEmailSuccess,
  } = useGlobalContext();

  const { resetPassword, resetPasswordEmail } = useAuthContext();

  const closeModal = () => {
    setIsResetModalOpen(false);
  };
  console.log(isResetModalOpen);

  const handleResetSubmit = () => {
    const data = new FormData(resetForm.current);
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    resetPasswordEmail(JSON.stringify(object))
      .then(() => {
        // success
        setIsResetEmailSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isResetEmailSuccess ? (
        <Modal
          show={isResetModalOpen}
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
                    setIsResetEmailSuccess(false);
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
              Please check your email for a link to reset your password.
            </div>
          </div>
        </Modal>
      ) : (
        <Modal 
          show={isResetModalOpen} 
          onHide={closeModal}
          backdrop="static"
          centered
          >
            
          <div
            className="form-body-container"
            style={{ width: "25rem", alignSelf: "center" }}
          >
            {/* //^ MODAL HEADER */}
            <div
              className="form-header-container"
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "1rem 1rem 0rem",
              }}
            >
              <div style={{ color: "black", fontSize: "36px" }}>
                Reset Password
              </div>
              {/* //^ CLOSE MODAL BUTTON */}
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
            {/* //^ MODAL BODY */}

            <Form
              ref={resetForm}
              noValidate
              validated={validated}
              onSubmit={handleResetSubmit}
            >
              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Enter your email</Form.Label>
                <Form.Control type="text" required name="email" />
                <Form.Control.Feedback type="invalid">
                  Please make sure to enter the email you used to create this
                  account.
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
                Send reset email
              </Button>
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetPasswordModal;
