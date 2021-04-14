import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import cancel from "../../img/cancel.svg";
import { useGlobalContext } from "../../context";
import mail from "../../img/mail.svg";

const ResetPasswordModal = ({
  validated,
  currentPassword,
  resetPassword,
  form,
  handleSubmit,
  isResetModalOpen,
  setIsResetModalOpen,
}) => {
  document.title = "Reset Password";

  const {
    isModalOpen,
    isResetEmailSuccess,
    setIsResetEmailSuccess,
  } = useGlobalContext();

  const closeModal = () => {
    setIsResetModalOpen(false);
  };
  console.log(isResetModalOpen);

  return (
    <>
      {isResetEmailSuccess ? (
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
        <Modal show={isResetModalOpen} onHide={closeModal}>
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
              ref={form}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Group className="center-form-group">
                <Form.Label className="form-label">Enter your email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  defaultValue={currentPassword}
                  name="source"
                  onChange={(e) => resetPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please make sure to enter the email you used to create this
                  account.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            <Button
              type="button"
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
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetPasswordModal;
