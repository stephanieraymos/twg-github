import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";

const url = "http://143.110.225.28/account/user/"; //* API LINK

function CustomerDb() {
  //* Setting state values, params are default values
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  //* Fetching the trucks db from the API link above
  const fetchUsers = async () => {
    console.log(accessToken);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    const newUsers = await response.json(); //returns a promise
    setUsers(newUsers); //Making sure the trucks list is current using newTrucks which adds each new truck to the truckLoad
    setAccessToken("access_token");
    setRefreshToken("refresh_token");
    if (response.ok) {
      console.log(response.status, "Get request successful");
    } else {
      console.log(response.status, "Somthing went wrong with the get request");
    }
  };

  //* useEffect fetches trucks only after initial render. This is accomplished by passing the empty array
  useEffect(() => {
    fetchUsers();
    console.log("Users fetched successfully inside the useEffect");
  }, []);
  // End of useEffect for fetch

  return (
    <>
      <div className="table-wrapper">
        <div className="header-items">
          <p className="all-trucks-table-header-name truck">FIRST NAME</p>
          <p className="all-trucks-table-header-price price">LAST NAME</p>
          <p className="all-trucks-table-header-contents contents">EMAIL</p>
        </div>

        <div className="truckLoad-list">
          {users.map((user) => {
            const { userId, firstName, lastName, email } = user;

            return (
              <div className="truckLoad" key={userId}>
                <p className="items all-trucks-name">{firstName}</p>
                <p className="items all-trucks-price">{lastName}</p>
                <p className="items all-trucks-contents">{email}</p>
              </div>
            );
          })}
        </div>
        <button className="download-manifest">Download User List</button>
      </div>
    </>
  );
}
export default CustomerDb;
