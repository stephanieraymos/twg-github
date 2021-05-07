import cancel from "../../img/cancel.svg";
import visibleOn from "../../img/visibility-on.svg";
import visibleOff from "../../img/visibility-off.svg";
import React, { useState, useRef } from "react";
import { useSuperuserContext } from "../../context/superuser";
import { Button, Modal, Form, InputGroup, Image, Row, Col } from "react-bootstrap";

const CreateUserModal = ({
    openUserModal,
    closeUserModal,
}) => {

    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const form = useRef(null);
    const [isVerified, setIsVerified] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);

    const {
        createUser,
        setUsers,
    } = useSuperuserContext();

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
        } else {
            // no password or confirm password errors but errors in other fields
            setValidated(true);

            if (form.checkValidity() === true) {
                // no errors
                performCreateUser();
            }
        }
    };

    const performCreateUser = () => {
        const data = new FormData(form.current);
        var object = {};
        data.forEach((value, key) => {
            object[key] = value
        });

        object["is_active"] = true;
        object["is_verified"] = isVerified;
        object["is_seller"] = isSeller;
        object["is_admin"] = isAdmin;
        object["is_superuser"] = isSuperuser;
        createUser(object)
            .then((user) => {
                setUsers(prevState => ({
                    ...prevState,
                    [user["id"]]: user
                }));
                closeUserModal();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Modal
                show={openUserModal}
                onHide={closeUserModal}
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
                            Create User
                </div>
                        <button
                            style={{
                                background: "transparent",
                                borderColor: "transparent",
                            }}
                        >
                            <img src={cancel} alt="cancel" onClick={closeUserModal} />
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
                            <Form.Control type="username" required name="username" />
                            <Form.Control.Feedback type="invalid">
                                This username is not available, please choose another.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">First Name</Form.Label>
                            <Form.Control type="text" required name="first_name" />
                            <Form.Control.Feedback type="invalid">
                                Please enter a first name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">Last Name</Form.Label>
                            <Form.Control type="text" required name="last_name" />
                            <Form.Control.Feedback type="invalid">
                                Please enter a last name.
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

                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">Company</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue=""
                                name="company"
                            />

                        </Form.Group>

                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue=""
                                name="phone_number"
                            />

                        </Form.Group>

                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">Billing Address</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue=""
                                name="billing_address"
                            />

                        </Form.Group>

                        <Form.Group as={Row} className="center-form-group">
                            <Form.Label column sm={4} className="form-label">Verified</Form.Label>
                            <Col sm={8}>
                                <div>
                                    <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                        checked={isVerified}
                                        onChange={() => setIsVerified(true)} />
                                    <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                        checked={!isVerified}
                                        onChange={() => setIsVerified(false)} />
                                </div>
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="center-form-group">
                            <Form.Label column sm={4} className="form-label">Seller</Form.Label>
                            <Col sm={8}>
                                <div>
                                    <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                        checked={isSeller}
                                        onChange={() => setIsSeller(true)} />
                                    <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                        checked={!isSeller}
                                        onChange={() => setIsSeller(false)} />
                                </div>
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="center-form-group">
                            <Form.Label column sm={4} className="form-label">Admin</Form.Label>
                            <Col sm={8}>
                                <div>
                                    <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                        checked={isAdmin}
                                        onChange={() => setIsAdmin(true)} />
                                    <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                        checked={!isAdmin}
                                        onChange={() => {
                                            if (!isSuperuser)
                                                setIsAdmin(false);
                                        }} />
                                </div>
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="center-form-group">
                            <Form.Label column sm={4} className="form-label">Superuser</Form.Label>
                            <Col sm={8}>
                                <div>
                                    <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                        checked={isSuperuser}
                                        onChange={() => {
                                            setIsSuperuser(true);
                                            setIsAdmin(true);
                                        }} />
                                    <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                        checked={!isSuperuser}
                                        onChange={() => setIsSuperuser(false)} />
                                </div>
                            </Col>
                        </Form.Group>
                        <Form.Text muted>NOTE: Marking Superuser as True will automatically mark Admin as True.</Form.Text>

                        <div className="form-footer-container">
                            <Button
                                type="submit"
                                className="form-button"
                                block
                                style={{ width: "100%", backgroundColor: "#f47c20" }}
                            >
                                Create
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default CreateUserModal;