import React from "react";
import SignInForm from "../../components/LoginForm/SignInForm";

const ManagerSignInPage = () => {
    return (
        <div>
            <h1>Manager Sign In Page</h1>
            <SignInForm manager={true} />
        </div>
    );
  };
  
  export default ManagerSignInPage;