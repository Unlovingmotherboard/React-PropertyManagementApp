import React from "react";
import SignUpForm from "../../components/LoginForm/SignUpForm";

const ManagerSignUpPage = () => {
    return (
        <div>
            <h1>Manager Sign Up Page</h1>
            <SignUpForm manager={true} />
        </div>
    );
  };
  
  export default ManagerSignUpPage;