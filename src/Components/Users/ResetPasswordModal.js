import React from "react";
import { Form, Modal } from "react-bootstrap";

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
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
