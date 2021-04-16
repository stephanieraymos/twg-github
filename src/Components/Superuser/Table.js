import React, { useEffect, useState } from "react";
import { Table, Image, Form, InputGroup, Button } from "react-bootstrap";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import checkGreen from "../../img/check-circle-green.svg";
import checkRed from "../../img/check-circle-red.svg";
import { useSuperuserContext } from "../../superuser";
import search from "../../img/search.svg";
import CreateUserModal from "./CreateUserModal";

const SuperuserTable = () => {
  let history = useHistory();

  const { users } = useSuperuserContext();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [booleanFilter, setBooleanFilter] = useState({
    none: true,
    is_seller: false,
    is_admin: false,
    is_superuser: false,
  });
  const [openUserModal, setOpenUserModal] = useState(false);

  let { url } = useRouteMatch();
  const headers = [
    "EMAIL",
    "FIRST NAME",
    "LAST NAME",
    "SELLER",
    "ADMIN",
    "SUPERUSER",
  ];
  const sortFields = [
    "email",
    "first_name",
    "last_name",
    "is_seller",
    "is_admin",
    "is_superuser",
  ];

  const closeUserModal = () => setOpenUserModal(false);

  useEffect(() => {
    const items = [];
    Object.entries(users).map(([_, value]) => {
      items.push(value);
    });
    setData(sortByKey(items, sortFields[0]));
  }, [users]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setFilteredData(filterByText(data, searchText.toLowerCase()));
  }, [searchText]);

  useEffect(() => {
    setFilteredData(
      filterByBoolean(
        data,
        booleanFilter["none"],
        booleanFilter[sortFields[3]],
        booleanFilter[sortFields[4]],
        booleanFilter[sortFields[5]]
      )
    );
  }, [booleanFilter]);

  const filterByText = (data, substring) => {
    return data.filter((object) => {
      const email = object[sortFields[0]].toLowerCase();
      const firstName = object[sortFields[1]].toLowerCase();
      const lastName = object[sortFields[2]].toLowerCase();
      return (
        email.indexOf(substring) !== -1 ||
        firstName.indexOf(substring) !== -1 ||
        lastName.indexOf(substring) !== -1
      );
    });
  };

  const filterByBoolean = (
    data,
    checkNone,
    checkSeller,
    checkAdmin,
    checkSuperuser
  ) => {
    return data.filter((object) => {
      if (checkNone) return true;

      let valid = false;
      if (checkSeller)
        valid = object[sortFields[3]] === booleanFilter[sortFields[3]];

      if (checkAdmin)
        valid = object[sortFields[4]] === booleanFilter[sortFields[4]];

      if (checkSuperuser)
        valid = object[sortFields[5]] === booleanFilter[sortFields[5]];

      return valid;
    });
  };

  const sortByKey = (data, key) => {
    return data.sort((a, b) => {
      const first = a[key];
      const second = b[key];

      if (first < second) return -1;
      if (first > second) return 1;

      return 0;
    });
  };

  return (
    <>
      <CreateUserModal
        openUserModal={openUserModal}
        closeUserModal={closeUserModal}
      />
      <div className="superuser-header-container">
        <Form style={{ width: "50%", marginRight: "15px" }}>
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Search</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Image src={search} thumbnail />
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form>

        <Form style={{ width: "35%", marginRight: "15px" }}>
          <Form.Group className="center-form-group">
            <Form.Label className="form-label">Filters</Form.Label>
            <div>
              <Form.Check
                inline
                style={{ color: "black", paddingRight: "15px" }}
                label="None"
                type="radio"
                id={`inline-radio-1`}
                checked={booleanFilter["none"]}
                onChange={() =>
                  setBooleanFilter({
                    none: true,
                    is_seller: false,
                    is_admin: false,
                    is_superuser: false,
                  })
                }
              />
              <Form.Check
                inline
                style={{ color: "black", paddingRight: "15px" }}
                label="Seller"
                type="radio"
                id={`inline-radio-2`}
                checked={booleanFilter[sortFields[3]]}
                onChange={() =>
                  setBooleanFilter((prevState) => ({
                    ...prevState,
                    [sortFields[3]]: !prevState[sortFields[3]],
                    none: false,
                  }))
                }
              />
              <Form.Check
                inline
                style={{ color: "black", paddingRight: "15px" }}
                label="Admin"
                type="radio"
                id={`inline-radio-3`}
                checked={booleanFilter[sortFields[4]]}
                onChange={() =>
                  setBooleanFilter((prevState) => ({
                    ...prevState,
                    [sortFields[4]]: !prevState[sortFields[4]],
                    none: false,
                  }))
                }
              />
              <Form.Check
                inline
                style={{ color: "black" }}
                label="Superuser"
                type="radio"
                id={`inline-radio-4`}
                checked={booleanFilter[sortFields[5]]}
                onChange={() =>
                  setBooleanFilter((prevState) => ({
                    ...prevState,
                    [sortFields[5]]: !prevState[sortFields[5]],
                    none: false,
                  }))
                }
              />
            </div>
          </Form.Group>
        </Form>

        <Button
          key="button-create-user"
          type="button"
          onClick={() => setOpenUserModal(true)}
          className="form-button"
          style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#f47c20",
            margin: "auto",
          }}
        >
          Create User
        </Button>
      </div>

      <div className="table-wrapper" style={{ padding: "0rem 2rem" }}>
        <Table className="sortable" responsive>
          <thead className="header-items">
            <tr>
              {headers.map((value) => (
                <th key={value}>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((value) => {
              let {
                id,
                email,
                first_name,
                last_name,
                is_seller,
                is_admin,
                is_superuser,
              } = value;
              const firstName =
                first_name.charAt(0).toUpperCase() + first_name.substring(1);
              const lastName =
                last_name.charAt(0).toUpperCase() + last_name.substring(1);
              return (
                <tr key={email}>
                  <td>
                    <Link className="table-id-link" to={`${url}/${id}`}>
                      {email}
                    </Link>
                  </td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>
                    <Image src={is_seller ? checkGreen : checkRed} />
                  </td>
                  <td>
                    <Image src={is_admin ? checkGreen : checkRed} />
                  </td>
                  <td>
                    <Image src={is_superuser ? checkGreen : checkRed} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default SuperuserTable;
