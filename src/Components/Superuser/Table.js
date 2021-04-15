import React from "react";
import { Table, Image } from "react-bootstrap";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import checkGreen from "../../img/check-circle-green.svg";
import checkRed from "../../img/check-circle-red.svg";
import { useSuperuserContext } from "../../superuser";

const SuperuserTable = () => {
    let history = useHistory();

    const { users } = useSuperuserContext();

    let { url } = useRouteMatch();
    const headers = ['EMAIL', 'FIRST NAME', 'LAST NAME', 'Superuser']

    return (
        <>
            <div className="table-wrapper">
                <Table className="sortable" responsive>
                    <thead className="header-items">
                        <tr>
                            {headers.map((value) => (
                                <th key={value}>{value}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(users).map(([key, value]) => {
                            let {
                                id,
                                email,
                                first_name,
                                last_name,
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
