import React from "react";
import { LoginForm } from "../../../frontend/src/components/LoginForm";

const Signin = () => {
  return (
    <div className="container">
      <LoginForm type={"signin"} />
    </div>
  );
};

export default Signin;
