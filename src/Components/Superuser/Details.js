import React, { useState, useEffect, useRef } from "react";
import Loading from "../../Pages/Loading";
import { useSuperuserContext } from "../../superuser";
import { useAuthContext } from "../../auth";
import { Button, Form, Row, Col } from "react-bootstrap";
import { userURL } from "../../Pages/urls";
import Navigation from "../Navigation/Navigation";
import { useParams, Link, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { superuserPATH } from "../../Pages/paths";

const SuperuserDetails = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [validated, setValidated] = useState(false);
    const form = useRef(null);

    let history = useHistory();

    document.title = "User Details";

    const [originalValues, setOriginalValues] = useState({})

    const {
        email, setEmail,
        firstName, setFirstName,
        lastName, setLastName,
        company, setCompany,
        phoneNumber, setPhoneNumber,
        billingAddress, setBillingAddress,
        isActive, setIsActive,
        isVerified, setIsVerified,
        isSeller, setIsSeller,
        isAdmin, setIsAdmin,
        isSuperuser, setIsSuperuser,
        dateJoined, setDateJoined,
        lastLogin, setLastLogin,
        setUsers,
        getUserById,
        updateUser,
    } = useSuperuserContext();

    const fields = [
        "email",
        "first_name",
        "last_name",
        "company",
        "phone_number",
        "billing_address",
        "is_active",
        "is_verified",
        "is_seller",
        "is_admin",
        "is_superuser"
    ]

    const updateOriginalValues = (user) => {
        if (user == null) {
            setOriginalValues(prevState => ({
                ...prevState,
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "company": company,
                "phone_number": phoneNumber,
                "billing_address": billingAddress,
                "is_active": isActive,
                "is_verified": isVerified,
                "is_seller": isSeller,
                "is_admin": isAdmin,
                "is_superuser": isSuperuser,
            }));
        } else {
            const newFields = {}
            for (const field of fields) {
                newFields[field] = user[field];
            }
            
            setOriginalValues(prevState => ({
                ...prevState,
                ...newFields
            }));
        }
    };

    const cancel = () => {
        setIsEditing(false);
        setEmail(originalValues["email"]);
        setFirstName(originalValues["first_name"]);
        setLastName(originalValues["last_name"]);
        setCompany(originalValues["company"]);
        setPhoneNumber(originalValues["phone_number"]);
        setBillingAddress(originalValues["billing_address"]);
        setIsActive(originalValues["is_active"]);
        setIsVerified(originalValues["is_verified"]);
        setIsSeller(originalValues["is_seller"]);
        setIsAdmin(originalValues["is_admin"]);
        setIsSuperuser(originalValues["is_superuser"]);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            setValidated(false);
            performUserUpdate();
        } else {
            setValidated(true);
        }
    };

    const performUserUpdate = () => {
        const data = new FormData(form.current);
        var object = {};
        data.forEach((value, key) => {
            object[key] = value
        });

        object["id"] = id;
        object["is_active"] = isActive;
        object["is_verified"] = isVerified;
        object["is_seller"] = isSeller;
        object["is_admin"] = isAdmin;
        object["is_superuser"] = isSuperuser;
        updateUser(object)
            .then((user) => {
                setIsEditing(false);
                setUsers(prevState => ({
                    ...prevState,
                    [id]: object
                }));
                updateOriginalValues(null);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserById(id)
            .then((user) => {
                updateOriginalValues(user);
            })
            .catch((error) => console.log(error))
    }, []);

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <>
            <div>
                <Navigation />
            </div>

            <div className="account-details-wrapper">
                <div
                    className="form-label"
                    style={{ width: "85%", color: "black", fontSize: "36px", margin: "24px auto" }}
                    >
                    {`${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`}
                </div>

                <Form
                    ref={form}
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    style={{ width: "85%", margin: "24px auto" }}
                >
                    <Form.Group as={Row} className="center-form-group">
                        <Form.Label column sm={4} className="form-label">Email</Form.Label>
                        <Col sm={8}>
                            {
                                isEditing ? (
                                    <Form.Control
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                    />
                                ) : (
                                    <Form.Control
                                        type="email"
                                        required
                                        readOnly
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
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
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        name="first_name"
                                    />
                                ) : (
                                    <Form.Control
                                        type="text"
                                        required
                                        readOnly
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        name="first_name"
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
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        name="last_name"
                                    />
                                ) : (
                                    <Form.Control
                                        type="text"
                                        required
                                        readOnly
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        name="last_name"
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
                                        name="company"
                                    />
                                ) : (
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        name="company"
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
                                        name="phone_number"
                                    />
                                ) : (
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        name="phone_number"
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
                                        name="billing_address"
                                    />
                                ) : (
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        value={billingAddress}
                                        onChange={(e) => setBillingAddress(e.target.value)}
                                        name="billing_address"
                                    />
                                )
                            }
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="center-form-group">
                        <Form.Label column sm={4} className="form-label">Active</Form.Label>
                        <Col sm={8}>
                            {
                                isEditing ? (
                                    <div>
                                        <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isActive}
                                            onChange={() => setIsActive(true)} />
                                        <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isActive}
                                            onChange={() => setIsActive(false)} />
                                    </div>
                                ) : (
                                    <div>
                                        <Form.Check readOnly inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isActive} />
                                        <Form.Check readOnly inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isActive} />
                                    </div>
                                )
                            }
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="center-form-group">
                        <Form.Label column sm={4} className="form-label">Verified</Form.Label>
                        <Col sm={8}>
                            {
                                isEditing ? (
                                    <div>
                                        <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isVerified}
                                            onChange={() => setIsVerified(true)} />
                                        <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isVerified}
                                            onChange={() => setIsVerified(false)} />
                                    </div>
                                ) : (
                                    <div>
                                        <Form.Check readOnly inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isVerified} />
                                        <Form.Check readOnly inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isVerified} />
                                    </div>
                                )
                            }
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="center-form-group">
                        <Form.Label column sm={4} className="form-label">Seller</Form.Label>
                        <Col sm={8}>
                            {
                                isEditing ? (
                                    <div>
                                        <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isSeller}
                                            onChange={() => setIsSeller(true)} />
                                        <Form.Check inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isSeller}
                                            onChange={() => setIsSeller(false)} />
                                    </div>
                                ) : (
                                    <div>
                                        <Form.Check readOnly inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isSeller} />
                                        <Form.Check readOnly inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isSeller} />
                                    </div>
                                )
                            }
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="center-form-group">
                        <Form.Label column sm={4} className="form-label">Admin</Form.Label>
                        <Col sm={8}>
                            {
                                isEditing ? (
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
                                ) : (
                                    <div>
                                        <Form.Check readOnly inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isAdmin} />
                                        <Form.Check readOnly inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isAdmin} />
                                    </div>
                                )
                            }
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="center-form-group">
                        <Form.Label column sm={4} className="form-label">Superuser</Form.Label>
                        <Col sm={8}>
                            {
                                isEditing ? (
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
                                ) : (
                                    <div>
                                        <Form.Check readOnly inline style={{color: "black", paddingRight: "50px"}} label="True" type="radio" id={`inline-radio-1`} 
                                            checked={isSuperuser} />
                                        <Form.Check readOnly inline style={{color: "black"}} label="False" type="radio" id={`inline-radio-2`} 
                                            checked={!isSuperuser} />
                                    </div>
                                )
                            }
                        </Col>
                    </Form.Group>
                    {isEditing && 
                        <Form.Text muted>NOTE: Marking Superuser as True will automatically mark Admin as True.</Form.Text>
                    }


                    <div className="form-footer-container" style={{
                        flexDirection: "row",
                        marginTop: "10px"
                    }}>
                        <Button
                            key={isEditing ? "button-submit" : "button-edit"}
                            type={isEditing ? "submit" : "button"}
                            onClick={isEditing ? null : () => setIsEditing(true)}
                            className="form-button"
                            style={{ width: "150px", backgroundColor: "#f47c20", alignSelf: "start", margin: "1rem 0rem" }}
                        >
                            {isEditing ? "Update" : "Edit User"}
                        </Button>

                        <div 
                            style={{
                                width: "24px",
                                height: "0px",
                            }}>
                        </div>

                        <Button
                            key={isEditing ? "button-cancel" : "button-back"}
                            type="button"
                            onClick={isEditing ? () => cancel() : (e) => {
                                e.preventDefault();
                                history.replace(superuserPATH);
                              }}
                            className="form-button"
                            block
                            style={{ width: "150px", backgroundColor: "#f47c20", alignSelf: "start", margin: "1rem 0rem" }}
                        >
                            {isEditing ? "Cancel" : "Back to Table"}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default SuperuserDetails;

// TP-52
