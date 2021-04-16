import React, { useEffect, useState } from "react";
import { Table, Image, Form, InputGroup } from "react-bootstrap";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import checkGreen from "../../img/check-circle-green.svg";
import checkRed from "../../img/check-circle-red.svg";
import { useSuperuserContext } from "../../superuser";
import search from "../../img/search.svg";

const SuperuserTable = () => {
    let history = useHistory();

    const { users } = useSuperuserContext();
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchText, setSearchText] = useState("");
    const [booleanFilter, setBooleanFilter] = useState({"none": true, "is_seller": false, "is_admin": false, "is_superuser": false})

    let { url } = useRouteMatch();
    const headers = ['EMAIL', 'FIRST NAME', 'LAST NAME', 'SELLER', 'ADMIN', 'SUPERUSER']
    const sortFields = [
        "email",
        "first_name",
        "last_name",
        "is_seller",
        "is_admin",
        "is_superuser"
    ]

    useEffect(() => {
        const items = [];
        Object.entries(users).map(([_, value]) => {
            items.push(value)
        });
        setData(sortByKey(items, sortFields[0]));
    }, [users])

    useEffect(() => {
        setFilteredData(data);
    }, [data])

    useEffect(() => {
        setFilteredData(filterByText(data, searchText.toLowerCase()));
    }, [searchText])

    useEffect(() => {
        console.log("filter", booleanFilter);
        setFilteredData(filterByBoolean(data));
    }, [booleanFilter])

    const filterByText = (data, substring) => {
        return data.filter((object) => {
            const email = object[sortFields[0]].toLowerCase();
            const firstName = object[sortFields[1]].toLowerCase();
            const lastName = object[sortFields[2]].toLowerCase();
            return email.indexOf(substring) !== -1 || firstName.indexOf(substring) !== -1 || lastName.indexOf(substring) !== -1;
        })
    }

    const filterByBoolean = (data) => {
        return data.filter((object) => {
            const seller = object[sortFields[3]];
            const admin = object[sortFields[4]];
            const superuser = object[sortFields[5]];
            return seller === booleanFilter[sortFields[3]] || admin === booleanFilter[sortFields[4]] || superuser === booleanFilter[sortFields[5]];
        })
    }

    const sortByKey = (data, key) => {
        return data.sort((a, b) => {
            const first = a[key];
            const second = b[key];

            if(first < second)
                return -1;
            if(first > second)
                return 1;

            return 0;
        })
    }

    return (
        <>
            <div className="superuser-header-container">
                <div className="superuser-search_filter-container" style={{
                    width: "60%"
                }}>
                    <Form
                        style={{ width: "100%" }}
                    >
                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">Search</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Image
                                        src={search}
                                        thumbnail
                                    />
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form>

                    <Form
                        style={{ width: "100%" }}
                    >
                        <Form.Group className="center-form-group">
                            <Form.Label className="form-label">Filters</Form.Label>
                            <div>
                                <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="None" type="radio" id={`inline-radio-1`}
                                    checked={booleanFilter["none"]}
                                    onChange={() => setBooleanFilter({"none": true, "is_seller": false, "is_admin": false, "is_superuser": false})} />
                                <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="Seller" type="radio" id={`inline-radio-1`}
                                    checked={booleanFilter[sortFields[3]]}
                                    onChange={() => setBooleanFilter(prevState => ({
                                        ...prevState,
                                        [sortFields[3]]: !prevState[sortFields[3]],
                                        "none": false
                                    }))} />
                                <Form.Check inline style={{color: "black", paddingRight: "50px"}} label="Admin" type="radio" id={`inline-radio-2`}
                                    checked={booleanFilter[sortFields[4]]}
                                    onChange={() => setBooleanFilter(prevState => ({
                                        ...prevState,
                                        [sortFields[4]]: !prevState[sortFields[4]],
                                        "none": false
                                    }))} />
                                <Form.Check inline style={{color: "black"}} label="Superuser" type="radio" id={`inline-radio-2`}
                                    checked={booleanFilter[sortFields[5]]}
                                    onChange={() => setBooleanFilter(prevState => ({
                                        ...prevState,
                                        [sortFields[5]]: !prevState[sortFields[5]],
                                        "none": false
                                    }))} />
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                
            </div>

            <div className="table-wrapper" style={{padding: "0rem 2rem"}}>
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

                            return (
                                <tr key={email} >
                                    <td>
                                        <Link className="table-id-link" to={`${url}/${id}`}>
                                            {email}
                                        </Link>
                                    </td>
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>
                                        <Image
                                            src={is_seller ? checkGreen : checkRed}
                                        />
                                    </td>
                                    <td>
                                        <Image
                                            src={is_admin ? checkGreen : checkRed}
                                        />
                                    </td>
                                    <td>
                                        <Image
                                            src={is_superuser ? checkGreen : checkRed}
                                        />
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
