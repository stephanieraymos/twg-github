import React from "react";
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
  } = useGlobalContext();

  const handleSignupSubmit = () => {
    console.log("Sign up successful");
  };

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
