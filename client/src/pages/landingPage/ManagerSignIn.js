import React from "react";
import SignInForm from "../../components/LoginForm/SignInForm";

const ManagerSignInPage = (...props) => {
    return (
        <div>
            <h1>Manager Sign In Page</h1>
            <SignInForm {...props} />
        </div>
    );
  };
  
  export default ManagerSignInPage;