import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useGlobalContext } from "./context";
const Signup = () => {
  document.title = "Sign up";

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    personId,
    setPersonId
  } = useGlobalContext();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up successful");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  // useEffect for post request
  useEffect(() => {
    fetch(
      " http://[website url]/register/?email=[string]&password=[string]&confirm_password=[string]&first_name=[string]&last_name=[string]",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          id: personId
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          setError(false);
          console.log("SUCCESSFULLY ADDED USER TO DATABASE");
          return response.json();
        } else if (response.status >= 408) {
          console.log(
            error,
            "There is an unknown error preventing the user from being added to the database"
          );
          setError(true);
        }
        console.log(response);
        return response.json();
      })
      .then((person) => setPersonId(person.id));
  }, []);

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div>
        <h1 className="form-header">Sign up</h1>
        <form onSubmit={handleSignupSubmit}>
          <div className="form-control">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              style={{ textAlign: "center" }}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              style={{ textAlign: "center" }}
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ textAlign: "center" }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ textAlign: "center" }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Repeat Password"
              style={{ textAlign: "center" }}
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
