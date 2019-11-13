import React from "react";
import SignInForm from "../../components/LoginForm/SignInForm";

const LoginInPage = (...props) => {
    return (
        <div>
            <h1>Tenant Sign In Page</h1>
            <SignInForm {...props} />
        </div>
    );
  };
  
  export default LoginInPage;