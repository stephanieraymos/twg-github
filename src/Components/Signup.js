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
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    personId,
    setPersonId,
    postToDb,
    setPostToDb
  } = useGlobalContext();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up successful");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // useEffect for user post request
  useEffect(() => {
    fetch(
      " http://143.110.225.28/register/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          confirm_password: confirmPassword,
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
  }, [postToDb]);

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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              style={{ textAlign: "center" }}
            />
            <button className="submit-btn" type="submit" onClick={setPostToDb}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
