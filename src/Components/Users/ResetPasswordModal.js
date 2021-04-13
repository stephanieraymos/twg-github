import React from "react";
import { Form, Modal } from "react-bootstrap";
import cancel from "../../img/cancel.svg";

const ResetPasswordModal = (
  validated,
  currentPassword,
  resetPassword,
  form,
  handleSubmit,
  isResetModalOpen,
  setIsResetModalOpen
) => {
  document.title = "Reset Password";

  const closeModal = () => {
    setIsResetModalOpen(false);
  };

  return (
    <>
      <Modal show={isResetModalOpen} onHide={closeModal}>
        <div
          className="form-body-container"
          style={{ width: "40rem", alignSelf: "center" }}
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
            <div
              className="form-label"
              style={{ color: "black", fontSize: "36px" }}
            >
              New Load
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
              <Form.Label className="form-label">Reset Password</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={currentPassword}
                name="source"
                onChange={(e) => resetPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
