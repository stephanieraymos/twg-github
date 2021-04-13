import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { userURL } from "../../Pages/urls";
import Navigation from "../Navigation/Navigation";

const UserDb = () => {
  //* Setting state values, params are default values
  const [users, setUsers] = useState([]);
  // const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  // //* Fetching the trucks db from the API link above
  // const fetchUsers = async () => {
  //   console.log(accessToken);
  //   const response = await fetch(userURL, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  //   console.log(response)
  //   const newUsers = response.json(); //returns a promise
  //   setUsers(newUsers); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
  //   console.log("users", users)
  //   setAccessToken("access_token");
  //   setRefreshToken("refresh_token");
  //   if (response.ok) {
  //     console.log(response.status, "Get request successful");
  //   } else {
  //     console.log(response.status, "Somthing went wrong with the get request");
  //   }
  // };

  // //* useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  // useEffect(() => {
  //   fetchUsers();
  //   console.log("Users fetched successfully inside the useEffect");
  // }, []);
  // // End of useEffect for fetch

  return (
    <>
      <Navigation />
      <div className="table-wrapper">
        <Table responsive>
          <thead className="header-items">
            <tr>
              <th id="id">FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody className="truckLoad">
            {/* key={userId} */}
            {users.map((user) => {
              let { userId, firstName, lastName, email } = user;

              return (
                <tr>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default UserDb;
