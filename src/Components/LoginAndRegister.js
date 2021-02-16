import React from "react";

const LoginAndRegister = () => {
  if (loginOption) {
    document.title = "Return Center - Login";
  } else {
    document.title = "Return Center - Register";
  }

  return (
    <>
      loginOption && <h1>Login</h1>
      registerOption && <h1>Register</h1>
    </>
  );
};

export default LoginAndRegister;
